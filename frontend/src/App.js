import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation, useParams, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Intro from "@/components/Intro";
import ReadingProgress from "@/components/ReadingProgress";
import InquiryModal from "@/components/InquiryModal";
import { InquiryContext } from "@/context/Inquiry";
import { initAnalytics, trackPageView, trackEvent } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

import Home from "@/pages/Home";
import Journal from "@/pages/Journal";
import Article from "@/pages/Article";
import TripBuilder from "@/pages/TripBuilder";
import About from "@/pages/About";
import Destinations from "@/pages/Destinations";
import LosCabos from "@/pages/LosCabos";
import Experience from "@/pages/Experience";
import Contact from "@/pages/Contact";

// Generic destination hub — routes /destinations/:slug through the LosCabos layout with the matching data
const HubBySlug = () => {
  const { slug } = useParams();
  return <LosCabos slug={slug} />;
};

// True both while the build-time prerenderer captures a route (window.__PRERENDER__,
// set by scripts/prerender.mjs) AND while a real user hydrates a page that was
// prerendered (window.__WAS_PRERENDERED__, set in index.js). In either case the
// first paint must skip the Intro overlay and the opacity:0/blur route-entry
// variant — so bots capture visible content and hydration matches the captured DOM.
const isPrerenderContext = () =>
  typeof window !== "undefined" &&
  (window.__PRERENDER__ === true || window.__WAS_PRERENDERED__ === true);

const pageVariants = {
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(6px)",
    transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] },
  },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  // Under prerender/hydration, render routes at their final state (initial={false})
  // so the captured HTML is fully visible and hydration matches — no blur/opacity flash.
  const routeInitial = isPrerenderContext() ? false : "initial";

  // Capture UTM/click-id attribution from the landing URL once (first-touch).
  useEffect(() => {
    captureAttribution();
  }, []);

  // GA4: load gtag once, then send a page_view on every client-side route change.
  useEffect(() => {
    initAnalytics();
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const snapToTop = () => {
      if (window.__lenis) {
        try {
          window.__lenis.scrollTo(0, { immediate: true, force: true, lock: true });
          window.__lenis.setScroll && window.__lenis.setScroll(0);
        } catch (e) { /* ignore */ }
      }
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };
    // Fire synchronously, then again next frame, then again after a tick
    snapToTop();
    const r1 = requestAnimationFrame(snapToTop);
    const t1 = setTimeout(snapToTop, 60);
    return () => {
      cancelAnimationFrame(r1);
      clearTimeout(t1);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div variants={pageVariants} initial={routeInitial} animate="animate" exit="exit">
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/journal"
          element={
            <motion.div variants={pageVariants} initial={routeInitial} animate="animate" exit="exit">
              <Journal />
            </motion.div>
          }
        />
        <Route
          path="/destinations"
          element={
            <motion.div variants={pageVariants} initial={routeInitial} animate="animate" exit="exit">
              <Destinations />
            </motion.div>
          }
        />
        <Route
          path="/destinations/los-cabos"
          element={
            <motion.div variants={pageVariants} initial={routeInitial} animate="animate" exit="exit">
              <LosCabos slug="los-cabos" />
            </motion.div>
          }
        />
        <Route
          path="/destinations/:slug"
          element={
            <motion.div variants={pageVariants} initial={routeInitial} animate="animate" exit="exit">
              <HubBySlug />
            </motion.div>
          }
        />
        <Route
          path="/journal/los-cabos"
          element={<Navigate to="/destinations/los-cabos" replace />}
        />
        <Route
          path="/journal/:slug"
          element={
            <motion.div variants={pageVariants} initial={routeInitial} animate="animate" exit="exit">
              <Article />
            </motion.div>
          }
        />
        <Route
          path="/trip-builder"
          element={<TripBuilder />}
        />
        <Route
          path="/experience"
          element={
            <motion.div variants={pageVariants} initial={routeInitial} animate="animate" exit="exit">
              <Experience />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div variants={pageVariants} initial={routeInitial} animate="animate" exit="exit">
              <About />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div variants={pageVariants} initial={routeInitial} animate="animate" exit="exit">
              <Contact />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// Hide global Nav + Footer on trip-builder (lead capture page)
const ChromeLayout = ({ children }) => {
  const location = useLocation();
  const minimal = location.pathname.startsWith("/trip-builder");
  if (minimal) return <>{children}</>;
  return (
    <>
      <Nav />
      <ReadingProgress />
      {children}
      <Footer />
    </>
  );
};

function App() {
  // The Intro splash mounts AFTER hydration — never in the prerendered/hydrated
  // tree (that would be a hydration mismatch, since routes are captured with no
  // overlay). The first-paint curtain in public/index.html covers the content in
  // the gap so there's no flash. That inline script sets data-gim-intro="pending"
  // only for first-time visitors (session flag unset, no ?skipIntro) and never
  // during prerender (puppeteer pre-seeds the flag), so bots capture clean content.
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.documentElement.getAttribute("data-gim-intro") === "pending") {
      setShowIntro(true);
    }
  }, []);

  // Once the Intro is mounted and covering the viewport, drop the pre-paint
  // curtain beneath it on the next frame (so there's never an uncovered gap).
  useEffect(() => {
    if (!showIntro) return undefined;
    const id = requestAnimationFrame(() =>
      document.documentElement.removeAttribute("data-gim-intro"));
    return () => cancelAnimationFrame(id);
  }, [showIntro]);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("cursor-custom");
    // Disable browser scroll restoration so route changes always reset to top
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // First paint hydrated a prerendered page (routes rendered at final state to
    // match the captured DOM). Clear the flag post-hydration so subsequent
    // client-side navigations get their normal blur/opacity entry animation back.
    if (typeof window !== "undefined") window.__WAS_PRERENDERED__ = false;
  }, []);

  // Lenis momentum smooth scroll (skip on touch devices to preserve native scroll)
  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    window.__lenis = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  const openInquiry = () => {
    setInquiryOpen(true);
    trackEvent("open_inquiry");
  };
  const closeInquiry = () => setInquiryOpen(false);

  return (
    <InquiryContext.Provider value={{ open: inquiryOpen, openInquiry, closeInquiry }}>
      <div className="App grain" data-testid="app-root">
        <Cursor />
        <AnimatePresence>
          {showIntro && <Intro key="intro" onDone={() => setShowIntro(false)} />}
        </AnimatePresence>
        <BrowserRouter>
          <ChromeLayout>
            <AnimatedRoutes />
          </ChromeLayout>
        </BrowserRouter>
        <InquiryModal open={inquiryOpen} onClose={closeInquiry} />
      </div>
    </InquiryContext.Provider>
  );
}

export default App;

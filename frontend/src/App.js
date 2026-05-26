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

import Home from "@/pages/Home";
import Journal from "@/pages/Journal";
import Article from "@/pages/Article";
import TripBuilder from "@/pages/TripBuilder";
import About from "@/pages/About";
import Destinations from "@/pages/Destinations";
import LosCabos from "@/pages/LosCabos";

// Generic destination hub — routes /destinations/:slug through the LosCabos layout with the matching data
const HubBySlug = () => {
  const { slug } = useParams();
  return <LosCabos slug={slug} />;
};

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/journal"
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Journal />
            </motion.div>
          }
        />
        <Route
          path="/destinations"
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Destinations />
            </motion.div>
          }
        />
        <Route
          path="/destinations/los-cabos"
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <LosCabos slug="los-cabos" />
            </motion.div>
          }
        />
        <Route
          path="/destinations/:slug"
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
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
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Article />
            </motion.div>
          }
        />
        <Route
          path="/trip-builder"
          element={<TripBuilder />}
        />
        <Route
          path="/about"
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <About />
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
  const [introDone, setIntroDone] = useState(() => {
    try {
      // Allow ?skipIntro=1 query param + sessionStorage flag
      if (typeof window !== "undefined" && /[?&]skipIntro=1/.test(window.location.search)) {
        return true;
      }
      return sessionStorage.getItem("gim-intro-seen") === "1";
    } catch (e) {
      return false;
    }
  });
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("cursor-custom");
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

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const openInquiry = () => setInquiryOpen(true);
  const closeInquiry = () => setInquiryOpen(false);

  return (
    <InquiryContext.Provider value={{ open: inquiryOpen, openInquiry, closeInquiry }}>
      <div className="App grain" data-testid="app-root">
        <Cursor />
        <AnimatePresence>
          {!introDone && <Intro key="intro" onDone={() => setIntroDone(true)} />}
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

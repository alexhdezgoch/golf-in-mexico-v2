import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import WhatsApp from "@/components/WhatsApp";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Journal from "@/pages/Journal";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } },
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
          path="/about"
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <About />
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
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("cursor-custom");
    const t = setTimeout(() => setLoaded(true), 850);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="App grain" data-testid="app-root">
      <Cursor />
      <AnimatePresence>{!loaded && <Loader key="loader" />}</AnimatePresence>
      <BrowserRouter>
        <Nav />
        <AnimatedRoutes />
        <Footer />
        <WhatsApp />
      </BrowserRouter>
    </div>
  );
}

export default App;

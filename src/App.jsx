import React, { useState, useEffect, useRef } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SEO from './components/SEO';
import './App.css';

const App = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const mainRef = useRef(null);

  useEffect(() => {
    // Track scroll progress
    const handleScroll = () => {
      if (!mainRef.current) return;
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HelmetProvider>
      <div className="app">
        {/* SEO Component */}
        <SEO />
        
        {/* Scroll progress indicator */}
        <div className="scroll-progress-container">
          <div 
            className="scroll-progress-bar" 
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
        
        <Navbar />
        
        <main ref={mainRef} className="main">
          <Hero />
          <About />
          <Projects />
          <Contact />
          <Footer />
        </main>
      </div>
    </HelmetProvider>
  );
};

export default App;

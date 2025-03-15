import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const roles = ['a Fullstack Developer.', 'a UI/UX Enthusiast.', 'a Networking Specialist.'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Typing effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
  
    let timeout;
  
    if (isTyping && typedText.length < currentRole.length) { // typing, not fully typed yet
      timeout = setTimeout(() => {
        setTypedText(currentRole.substring(0, typedText.length + 1));
      }, 80);
    } 
    else if (isTyping && typedText.length === currentRole.length) { // fully typed, now wait before deleting
      timeout = setTimeout(() => setIsTyping(false), 1000);
    }
    else if (!isTyping && typedText.length > 0) { // not typing, now delete
      timeout = setTimeout(() => {
        setTypedText(currentRole.substring(0, typedText.length - 1));
      }, 40);
    } 
    else if (!isTyping && typedText.length === 0) { // fully deleted, now move to the next role and start typing
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setIsTyping(true);
    }
  
    return () => clearTimeout(timeout); // clear timeout when component unmounts
  }, [typedText, isTyping, roleIndex, roles]);  

  // Set visibility after a short delay for entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="hero section">
      <div className="container hero-container">
        <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
          <h1 className="hero-title slide-in-left">
            Hi, I'm <span className="hero-name">Quinlan!</span>
          </h1>
          <div className="hero-role-container">
            <span className="hero-role slide-in-right" aria-live="polite">
              {typedText}<span className="cursor-blink">|</span>
            </span>
          </div>
          <p className="hero-description fade-in">
            I build beautiful, responsive websites and web applications with modern technologies.
          </p>
          <nav className="hero-buttons scale-in">
            <a href="#projects" className="btn btn-primary interactive" role="button" aria-label="View my work">View My Work</a>
            <a href="#contact" className="btn btn-outline interactive" role="button" aria-label="Contact me">Contact Me</a>
          </nav>
        </div>
        
        <div className={`hero-scroll float ${isVisible ? 'visible' : ''}`}>
          <p className="hero-scroll-text">Scroll Down</p>
          <div className="hero-scroll-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scroll down arrow">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

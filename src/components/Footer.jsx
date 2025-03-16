import React, { useState, useEffect, useRef } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [hoveredLink, setHoveredLink] = useState(null);
  const footerRef = useRef(null);

  useEffect(() => {
    // Add scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  // Social media links with hover animations
  const socialLinks = [
    {
      id: 'github',
      url: 'https://github.com/QuinOG',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.278 9.521 21.017C9.521 20.783 9.512 20.067 9.508 19.192C6.726 19.826 6.139 17.958 6.139 17.958C5.685 16.812 5.028 16.51 5.028 16.51C4.132 15.872 5.097 15.885 5.097 15.885C6.094 15.955 6.628 16.93 6.628 16.93C7.521 18.437 8.97 18.004 9.539 17.752C9.631 17.118 9.889 16.686 10.175 16.419C7.954 16.149 5.62 15.277 5.62 11.474C5.62 10.387 6.01 9.494 6.649 8.794C6.546 8.546 6.203 7.622 6.747 6.221C6.747 6.221 7.586 5.958 9.497 7.278C10.3 7.058 11.15 6.948 12 6.944C12.85 6.948 13.7 7.058 14.503 7.278C16.414 5.958 17.253 6.221 17.253 6.221C17.797 7.622 17.454 8.546 17.351 8.794C17.99 9.494 18.38 10.387 18.38 11.474C18.38 15.286 16.043 16.147 13.815 16.412C14.173 16.74 14.498 17.39 14.498 18.384C14.498 19.81 14.486 20.692 14.486 21.017C14.486 21.28 14.666 21.586 15.173 21.487C19.145 20.162 22 16.416 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
        </svg>
      ),
      label: 'GitHub'
    },
    {
      id: 'linkedin',
      url: 'https://linkedin.com/in/quinlan-davis-783065268/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" fill="currentColor"/>
        </svg>
      ),
      label: 'LinkedIn'
    },  
  ];

  return (
    <footer className="footer">
      <div 
        ref={footerRef} 
        className={`container footer-container ${isVisible ? 'visible' : ''}`}
      >
        <div className="footer-logo reveal">
          <span className="logo-text-secondary">
            Quin.dev<span className="logo-dot"></span>
          </span>
        </div>
        
        <div className="footer-social reveal">
          {socialLinks.map((link) => (
            <a 
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`footer-social-link interactive ${hoveredLink === link.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
              aria-label={link.label}
            >
              {link.icon}
              <span className="social-tooltip">{link.label}</span>
            </a>
          ))}
        </div>
        
        <div className="footer-copyright reveal">
          <p>&copy; {currentYear} Quin.dev All rights reserved.</p>
          <div className="footer-links">
            <p>Thanks for visiting! - Quin</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

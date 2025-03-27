import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import NetQuest from '../assets/NetQuest.jpg';
import ebay from '../assets/ebay.jpg';
import portfolio from '../assets/portfolio.jpg';

const projectsData = [
  {
    id: 1,
    title: "Networking Education Site",
    category: "Web Application",
    description: "An interactive platform for learning and mastering computer networking concepts.",
    image: NetQuest,
    link: "https://github.com/QuinOG",
    tech: ["React", "Node.js", "MongoDB"],
    fullDescription: "A comprehensive web application providing users with structured courses, quizzes, and interactive simulations to facilitate deep understanding of networking fundamentals and advanced topics. Built with React for dynamic user interfaces, Node.js for backend management, and MongoDB for storing user progress and data."
  },
  {
    id: 2,
    title: "eBay Aggregator",
    category: "Web Application",
    description: "A streamlined web app aggregating and organizing eBay listings.",
    image: ebay,
    link: "https://github.com/QuinOG",
    tech: ["HTML", "CSS", "JavaScript"],
    fullDescription: "The eBay Aggregator simplifies the search and comparison of PC component listings, allowing users to quickly find and analyze items based on their specifications. It leverages clean HTML and CSS for the interface, and Python to dynamically fetch, process, and display data in an intuitive layout."
  },
  {
    id: 3,
    title: "Portfolio Site",
    category: "UI/UX Design",
    description: "A responsive and visually engaging portfolio showcasing projects and skills.",
    image: portfolio,
    link: "https://github.com/QuinOG",
    tech: ["HTML", "CSS", "JavaScript"],
    fullDescription: "This portfolio website highlights professional experience, featured projects, and personal achievements with a clean, responsive design emphasizing usability and visual appeal. Developed with attention to detail in UI/UX principles and an interactive experience across all devices."
  }
];

const categories = ["All", "UI/UX Design", "Web Application"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [flippedCards, setFlippedCards] = useState({}); // Track which cards are flipped
  const [resumeModalOpen, setResumeModalOpen] = useState(false); // State for resume modal
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Track current card in stack
  const [isDragging, setIsDragging] = useState(false); // Track if user is dragging a card
  const [dragStartY, setDragStartY] = useState(0); // Starting Y position of drag
  const [dragOffset, setDragOffset] = useState(0); // Current drag distance
  
  const projectsRef = useRef(null);
  const modalContentRef = useRef(null);
  const resumeModalRef = useRef(null); // Ref for resume modal
  const cardStackRef = useRef(null); // Ref for card stack
  
  const filteredProjects = activeCategory === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  useEffect(() => {
    // Set visibility immediately instead of with delay
    setIsVisible(true);
    
    return () => {
      // Cleanup
    };
  }, []);

  // Reset current card index when category changes
  useEffect(() => {
    setCurrentCardIndex(0);
    setFlippedCards({});
  }, [activeCategory]);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeProjectModal = () => {
    setModalOpen(false);
    document.body.style.overflow = ''; // Re-enable scrolling
  };

  // Handle card flip toggling
  const handleCardFlip = (e, projectId) => {
    e.stopPropagation(); // Prevent other actions when flipping
    setFlippedCards(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  // Move to the next card in the stack
  const moveToNextCard = () => {
    // Only proceed if not on the last card
    if (currentCardIndex < filteredProjects.length - 1) {
      setFlippedCards({}); // Reset flipped state
      setCurrentCardIndex(prevIndex => prevIndex + 1);
    } else {
      // Loop back to the first card when at the end
      setFlippedCards({}); // Reset flipped state
      setCurrentCardIndex(0);
    }
  };

  // Move to the previous card in the stack
  const moveToPrevCard = () => {
    setFlippedCards({}); // Reset flipped state
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prevIndex => prevIndex - 1);
    } else {
      // Loop to the last card when at the beginning
      setCurrentCardIndex(filteredProjects.length - 1);
    }
  };

  // Handle start of card drag
  const handleDragStart = (e) => {
    // For mouse events
    if (e.type === 'mousedown') {
      setIsDragging(true);
      setDragStartY(e.clientY);
    } 
    // For touch events
    else if (e.type === 'touchstart') {
      setIsDragging(true);
      setDragStartY(e.touches[0].clientY);
    }
  };

  // Handle card drag movement
  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    // Calculate drag distance
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    const offset = clientY - dragStartY;
    
    // Only allow dragging down (positive offset)
    if (offset > 0) {
      setDragOffset(offset);
    }
  };

  // Handle end of card drag
  const handleDragEnd = () => {
    if (!isDragging) return;
    
    // If dragged far enough, move to next card
    if (dragOffset > 100) {
      moveToNextCard();
    }
    
    // Reset drag state
    setIsDragging(false);
    setDragOffset(0);
  };

  // Open resume modal
  const openResumeModal = () => {
    setResumeModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  // Close resume modal
  const closeResumeModal = () => {
    setResumeModalOpen(false);
    document.body.style.overflow = ''; // Re-enable scrolling
  };

  // Close modal when clicking outside content
  const handleModalClick = (e) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
      closeProjectModal();
    }
  };

  // Handle resume modal click outside content
  const handleResumeModalClick = (e) => {
    if (resumeModalRef.current && !resumeModalRef.current.contains(e.target)) {
      closeResumeModal();
    }
  };

  // Close modals with escape key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        if (modalOpen) closeProjectModal();
        if (resumeModalOpen) closeResumeModal();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [modalOpen, resumeModalOpen]);

  // Add mouse/touch event listeners for card dragging
  useEffect(() => {
    const handleMouseMove = (e) => handleDragMove(e);
    const handleTouchMove = (e) => handleDragMove(e);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchEnd = () => handleDragEnd();
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  // Get current project for main display
  const currentProject = filteredProjects[currentCardIndex];

  return (
    <section id="projects" className="projects section">
      {/* Section-specific SEO */}
      <Helmet>
        <title>Quinlan Davis | Projects</title>
        <meta name="description" content="Explore my portfolio of web development projects including networking education sites, data aggregators, and UI/UX designs." />
      </Helmet>
      
      <div ref={projectsRef} className={`container projects-container ${isVisible ? 'visible' : ''}`}>
        <div className="projects-content-wrapper">
          {/* Left side - Card Stack */}
          <div className="card-stack-container">
            <div 
              className="card-stack" 
              ref={cardStackRef}
            >
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className={`stack-card 
                    ${index === currentCardIndex ? 'active' : ''} 
                    ${index < currentCardIndex ? 'previous' : ''} 
                    ${index > currentCardIndex ? 'next' : ''} 
                    ${flippedCards[project.id] ? 'flipped' : ''}
                    ${isDragging && index === currentCardIndex ? 'dragging' : ''}
                  `}
                  style={
                    index === currentCardIndex && isDragging 
                      ? { transform: `translateY(${dragOffset}px) rotate(${dragOffset * 0.1}deg)` } 
                      : {}
                  }
                  onMouseDown={index === currentCardIndex ? handleDragStart : undefined}
                  onTouchStart={index === currentCardIndex ? handleDragStart : undefined}
                >
                  {/* Front of card */}
                  <div className="stack-card-front">
                    <div className="stack-card-image">
                      <img src={project.image} alt={`Screenshot of ${project.title} project`} />
                      <div className="stack-card-category">{project.category}</div>
                    </div>
                    <div className="stack-card-content">
                      <h3 className="stack-card-title">{project.title}</h3>
                      <p className="stack-card-description">{project.description}</p>
                      
                      <div className="stack-card-tech">
                        {project.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="stack-card-tech-item">{tech}</span>
                        ))}
                      </div>
                      
                      <div className="stack-card-actions">
                        <button 
                          className="stack-card-flip-btn"
                          onClick={(e) => handleCardFlip(e, project.id)}
                          aria-label="Flip card"
                        >
                          Flip Card
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 2v6h6M8 2v6H2M16 22v-6h6M8 22v-6H2M12 2v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        
                        <button 
                          className="stack-card-details-btn"
                          onClick={() => openProjectModal(project)}
                          aria-label="View project details"
                        >
                          View Details
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Back of card */}
                  <div className="stack-card-back">
                    <div className="stack-card-back-content">
                      <h3 className="stack-card-title">{project.title}</h3>
                      <p className="stack-card-full-description">{project.fullDescription}</p>
                      
                      <div className="stack-card-back-tech">
                        <h4>Technologies Used:</h4>
                        <div className="stack-card-tech">
                          {project.tech.map((tech, techIndex) => (
                            <span key={techIndex} className="stack-card-tech-item">{tech}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="stack-card-actions">
                        <button 
                          className="stack-card-flip-btn"
                          onClick={(e) => handleCardFlip(e, project.id)}
                          aria-label="Flip card back"
                        >
                          Flip Back
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 2v6h6M8 2v6H2M16 22v-6h6M8 22v-6H2M12 2v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="stack-card-link-btn"
                          aria-label="View project repository"
                        >
                          View Project
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Card navigation controls */}
            <div className="card-stack-controls">
              <button 
                className="card-nav-btn prev"
                onClick={moveToPrevCard}
                aria-label="Previous project"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className="card-indicators">
                {filteredProjects.map((_, index) => (
                  <button
                    key={index}
                    className={`card-indicator ${index === currentCardIndex ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentCardIndex(index);
                      setFlippedCards({});
                    }}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                className="card-nav-btn next"
                onClick={moveToNextCard}
                aria-label="Next project"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="card-stack-hint">
              <span>← Swipe to see more projects →</span>
            </div>
          </div>
          
          {/* Right side - Section info */}
          <div className="projects-info">
            <header className="projects-header">
              <h2 className="projects-title">My Projects</h2>
              <p className="projects-description">
                Here are some of my recent projects. Each project showcases different skills and technologies I've worked with.
                Swipe through the cards or use the navigation buttons to explore my work.
              </p>
              
              <nav className="projects-filter" aria-label="Project categories">
                {categories.map((category, index) => (
                  <button 
                    key={index} 
                    className={`projects-filter-button ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </nav>
              
              <button className="resume-button" onClick={openResumeModal}>
                View Resume
              </button>
            </header>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <dialog 
        className={`project-modal ${modalOpen ? 'open' : ''}`}
        onClick={handleModalClick}
        open={modalOpen}
      >
        <button className="project-modal-close" onClick={closeProjectModal} aria-label="Close modal">×</button>
        
        {selectedProject && (
          <article className="project-modal-content" ref={modalContentRef}>
            <figure className="project-modal-image">
              <img src={selectedProject.image} alt={`Screenshot of ${selectedProject.title} project`} />
            </figure>
            <div className="project-modal-body">
              <h2 className="project-modal-title">{selectedProject.title}</h2>
              <p className="project-modal-description">{selectedProject.fullDescription}</p>
              
              <div className="project-modal-tech">
                <h3>Technologies Used:</h3>
                <ul className="project-modal-tech-list">
                  {selectedProject.tech.map((tech, index) => (
                    <li key={index} className="project-modal-tech-item">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              
              <a 
                href={selectedProject.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary project-modal-link"
              >
                View Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </article>
        )}
      </dialog>

      {/* Resume Modal */}
      <dialog 
        className={`resume-modal ${resumeModalOpen ? 'open' : ''}`}
        onClick={handleResumeModalClick}
        open={resumeModalOpen}
      >
        <button className="resume-modal-close" onClick={closeResumeModal} aria-label="Close resume">×</button>
        
        <div className="resume-modal-content" ref={resumeModalRef}>
          <div className="resume-header">
            <h2 className="resume-title">My Resume</h2>
            <a 
              href="/2025Resume.pdf" 
              download="Quinlan_Davis_Resume.pdf" 
              className="resume-download-button"
            >
              Download PDF
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15L12 3M12 15L8 11M12 15L16 11M3 17V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          {/* Resume is embedded as an iframe for viewing */}
          <div className="resume-viewer">
            <iframe 
              src="/2025Resume.pdf" 
              title="Resume" 
              width="100%" 
              height="100%" 
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default Projects;

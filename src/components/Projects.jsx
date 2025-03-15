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
  const projectsRef = useRef(null);
  const modalContentRef = useRef(null);
  
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

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeProjectModal = () => {
    setModalOpen(false);
    document.body.style.overflow = ''; // Re-enable scrolling
  };

  // Close modal when clicking outside content
  const handleModalClick = (e) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
      closeProjectModal();
    }
  };

  // Close modal with escape key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && modalOpen) {
        closeProjectModal();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [modalOpen]);

  return (
    <section id="projects" className="projects section">
      {/* Section-specific SEO */}
      <Helmet>
        <title>Quinlan Davis | Projects</title>
        <meta name="description" content="Explore my portfolio of web development projects including networking education sites, data aggregators, and UI/UX designs." />
      </Helmet>
      
      <div ref={projectsRef} className={`container projects-container ${isVisible ? 'visible' : ''}`}>
        <header className="projects-header">
          <h2 className="projects-title">My Projects</h2>
          <p className="projects-description">
            Here are some of my recent projects. Each project showcases different skills and technologies I've worked with.
          </p>
        </header>
        
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
        
        <ul className="projects-grid">
          {filteredProjects.map((project) => (
            <li 
              key={project.id} 
              className={`project-card ${isVisible ? 'active' : ''}`}
              onClick={() => openProjectModal(project)}
            >
              <article>
                <figure className="project-image">
                  <img src={project.image} alt={`Screenshot of ${project.title} project`} />
                  <figcaption className="project-category">{project.category}</figcaption>
                </figure>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <footer className="project-footer">
                    <div className="project-link">
                      View Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <ul className="project-tech">
                      {project.tech.map((tech, index) => (
                        <li key={index} className="project-tech-item" title={tech}>
                          {tech.charAt(0)}
                        </li>
                      ))}
                    </ul>
                  </footer>
                </div>
              </article>
            </li>
          ))}
        </ul>
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
    </section>
  );
};

export default Projects;

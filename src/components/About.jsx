import React from 'react';
import avatar from '../avatar.jpg';
import { useState } from 'react';
import html from '../html5.png';
import css from '../css3.png';
import javascript from '../javascript.png';
import react from '../react.png';
import node from '../nodejs.png';
import sql from '../mysql.png';
import git from '../github.png';

const About = () => {
  const skills = [
    { id: 1, skill: 'HTML', src: html, alt: 'HTML' }, 
    { id: 2, skill: 'CSS', src: css, alt: 'CSS' }, 
    { id: 3, skill: 'JavaScript', src: javascript, alt: 'JavaScript' }, 
    { id: 4, skill: 'React', src: react, alt: 'React' }, 
    { id: 5, skill: 'Node.js', src: node, alt: 'Node.js' }, 
    { id: 6, skill: 'SQL', src: sql, alt: 'SQL' }, 
    { id: 7, skill: 'Git', src: git, alt: 'Git' }
  ];
  const bios = [
    "My journey in IT started 2 years ago, and since then, I've worked on a variety of projects, from setting up networks to complex web applications. I'm constantly learning and exploring new technologies to stay at the forefront of web development.", 
    "I am a quick learner and I am always looking for new challenges. Trying my best to learn and grow", 
    "Trying my best to learn and grow."
  ];

  function BioRotation({bios}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
      setCurrentIndex((currentIndex + 1) % bios.length);
    };
    return (
      <div className="bio-container">
        <div className="bio-button-container">
          <button className="btn btn-primary" onClick={handleNext}>🔄 Shorten Bio</button>
        </div>
        <span>{bios[currentIndex]}</span>
      </div>
    );
  }

  return (
    <section id="about" className="about section">
      <div className="container about-container">
        <div className="about-content">
          <h2 className="about-title">About Me</h2>
          <div className="about-description">
            <BioRotation bios={bios} />
          </div>
          
          <div className="about-skills">
            <h3 className="about-skills-title">Skills</h3>
            <div className="about-skills-list">
              {skills.map((skill, index) => (
                <img key={skill.id} src={skill.src} alt={skill.alt} style={{ width: '40px', height: '40px' }} className="bio-image" />
              ))}
            </div>
          </div>
        </div>
        
        <div className="about-image-container">
          <div className="about-image-decoration"></div>
          <img 
            src={avatar}
            alt="Profile" 
            className="about-image" 
          />
        </div>
      </div>
    </section>
  );
};

export default About;

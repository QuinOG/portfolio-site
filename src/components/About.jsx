import React from 'react';
import avatar from '../assets/avatar.jpg';
import { useState } from 'react';
import html from '../assets/html5.png';
import css from '../assets/css3.png';
import javascript from '../assets/javascript.png';
import react from '../assets/react.png';
import node from '../assets/nodejs.png';
import sql from '../assets/mysql.png';
import git from '../assets/github.png';

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
    "Trying my best to learn and grow.",
    "I'm a quick learner who enjoys taking on new challenges and constantly seeks opportunities to grow.",
    "My journey in IT began two years ago, and since then, I've worked on diverse projects ranging from network setups to developing complex web applications. I continually explore and learn new technologies to remain at the forefront of web development.",
    "I'm currently pursuing an A.S. degree in IT Security, specializing in Cybersecurity. My journey in IT began two years ago, during which I've gained experience working on various projects, from configuring networks to building complex web applications. I'm committed to continuous learning to keep up with the rapidly evolving field of web development.",
    "I'm currently pursuing my A.S. degree in IT Security, specializing in Cybersecurity, at Santa Fe College in my hometown of Gainesville, Florida. My journey in IT began two years ago, and since then, I've had the opportunity to work on various projects, ranging from network setups to advanced web applications. I'm dedicated to continually learning and exploring emerging technologies to stay ahead in the dynamic field of web development."
    ];

  const BioRotation = () => {
    const [bioLength, setBioLength] = useState(2); // Default bio selection (index 2)

    return (
      <div className="bio-switcher">
        <p className="bio-label-text">ADJUST BIO LENGTH:</p>
        <div className="radio-group">
          {bios.map((_, index) => (
            <label key={index} className="radio-label">
              <input
                type="radio"
                name="bio-length"
                value={index}
                checked={bioLength === index}
                onChange={() => setBioLength(index)}
                className="radio-input"
              />
              <span className="radio-custom" />
            </label>
          ))}
        </div>
        <div className="bio-length-text-container">
          <p className="bio-length-text">shortest</p>
          <p className="bio-length-text">to</p>
          <p className="bio-length-text">longest</p>
        </div>
  
        <p className="bio-text">
          {bios[bioLength]}
        </p>
      </div>
    );
  };

  return (
    <section id="about" className="about section">
      <div className="container about-container">
        <div className="about-content">
          <h2 className="about-title">About Me</h2>
          <div className="about-description">
            <BioRotation bios={bios} />
          </div>
          
          <div className="about-skills">
            <h3 className="about-skills-title">Preferred Stack</h3>
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

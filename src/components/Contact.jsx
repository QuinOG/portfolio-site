import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Form validation schema
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  message: yup.string()
    .required('Message is required')
    .min(10, 'Message should be at least 10 characters')
});

const Contact = () => {
  const [formStatus, setFormStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const contactRef = useRef(null);
  const formRef = useRef(null);

  // Initialize React Hook Form
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

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
    
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }
    
    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  // Form submission handler
  const onSubmit = async (data) => {
    setFormStatus('sending');
    
    try {
      // Using Formspree for form submission
      const response = await fetch('https://formspree.io/f/xeoaoajj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setFormStatus('success');
        reset(); // Reset form fields
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setFormStatus(null);
        }, 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => {
          setFormStatus(null);
        }, 3000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      setTimeout(() => {
        setFormStatus(null);
      }, 3000);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div ref={contactRef} className={`container contact-container ${isVisible ? 'visible' : ''}`}>
        <div className="contact-header reveal">
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-description">
            Have a project in mind or want to chat? Feel free to reach out and I'll get back to you soon.
          </p>
        </div>
        
        <div className="contact-content">
          <form 
            ref={formRef}
            className={`contact-form reveal ${formStatus === 'success' ? 'success' : ''} ${formStatus === 'error' ? 'error' : ''}`} 
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={`form-group ${errors.name ? 'error' : ''} ${focusedInput === 'name' ? 'focused' : ''}`}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="interactive"
                placeholder="Your name"
                {...register('name')}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
              />
              {errors.name && <div className="form-error">{errors.name.message}</div>}
            </div>
            
            <div className={`form-group ${errors.email ? 'error' : ''} ${focusedInput === 'email' ? 'focused' : ''}`}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="interactive"
                placeholder="Your email"
                {...register('email')}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
              />
              {errors.email && <div className="form-error">{errors.email.message}</div>}
            </div>
            
            <div className={`form-group ${errors.message ? 'error' : ''} ${focusedInput === 'message' ? 'focused' : ''}`}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                className="interactive"
                placeholder="Your message"
                rows="5"
                {...register('message')}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
              ></textarea>
              {errors.message && <div className="form-error">{errors.message.message}</div>}
            </div>
            
            <button 
              type="submit" 
              className={`btn btn-primary contact-submit interactive ${formStatus === 'sending' ? 'sending' : ''}`}
              disabled={formStatus === 'sending'}
            >
              {formStatus === 'sending' ? (
                <>
                  <span className="btn-text">Sending</span>
                  <span className="btn-loader"></span>
                </>
              ) : 'Send Message'}
            </button>
            
            {formStatus === 'success' && (
              <div className="form-success">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>
                </svg>
                <span>Message sent successfully!</span>
              </div>
            )}
            
            {formStatus === 'error' && (
              <div className="form-error-message">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="currentColor"/>
                </svg>
                <span>Something went wrong. Please try again.</span>
              </div>
            )}
          </form>
          
          <div className="contact-info reveal">
            <div className="contact-info-item interactive">
              <div className="contact-info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="contact-info-content">
                <h3>Email</h3>
                <a href="mailto:quinlandavis0010@gmail.com" className="contact-link">quinlandavis0010@gmail.com</a>
              </div>
            </div>
            
            <div className="contact-info-item interactive">
              <div className="contact-info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12ZM18 10.2C18 6.57 15.35 4 12 4C8.65 4 6 6.57 6 10.2C6 12.54 7.95 15.64 12 19.34C16.05 15.64 18 12.54 18 10.2ZM12 2C16.2 2 20 5.22 20 10.2C20 13.52 17.33 17.45 12 22C6.67 17.45 4 13.52 4 10.2C4 5.22 7.8 2 12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="contact-info-content">
                <h3>Location</h3>
                <p>Gainesville, FL</p>
              </div>
            </div>
            
            <div className="contact-info-item interactive">
              <div className="contact-info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="contact-info-content">
                <h3>Available</h3>
                <p>Mon - Fri: 9am - 6pm</p>
              </div>
            </div>
            
            <div className="contact-social">
              <a href="https://github.com/QuinOG" target="_blank" rel="noopener noreferrer" className="contact-social-link interactive">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.278 9.521 21.017C9.521 20.783 9.512 20.067 9.508 19.192C6.726 19.826 6.139 17.958 6.139 17.958C5.685 16.812 5.028 16.51 5.028 16.51C4.132 15.872 5.097 15.885 5.097 15.885C6.094 15.955 6.628 16.93 6.628 16.93C7.521 18.437 8.97 18.004 9.539 17.752C9.631 17.118 9.889 16.686 10.175 16.419C7.954 16.149 5.62 15.277 5.62 11.474C5.62 10.387 6.01 9.494 6.649 8.794C6.546 8.546 6.203 7.622 6.747 6.221C6.747 6.221 7.586 5.958 9.497 7.278C10.3 7.058 11.15 6.948 12 6.944C12.85 6.948 13.7 7.058 14.503 7.278C16.414 5.958 17.253 6.221 17.253 6.221C17.797 7.622 17.454 8.546 17.351 8.794C17.99 9.494 18.38 10.387 18.38 11.474C18.38 15.286 16.043 16.147 13.815 16.412C14.173 16.74 14.498 17.39 14.498 18.384C14.498 19.81 14.486 20.692 14.486 21.017C14.486 21.28 14.666 21.586 15.173 21.487C19.145 20.162 22 16.416 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/quinlan-davis-783065268/" target="_blank" rel="noopener noreferrer" className="contact-social-link interactive">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

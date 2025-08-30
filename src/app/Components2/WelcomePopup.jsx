"use client";

import React, { useState, useEffect } from "react";
import styles from "./WelcomePopup.module.css";

export default function WelcomePopup({ delay = 120000 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subscribe: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after specified delay (default 60 seconds)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send data to our API endpoint
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('Subscription successful:', result.message);
        setIsSubmitted(true);
        
        // Hide popup after 3 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      } else {
        console.error('Subscription failed:', result.message);
        alert('Sorry, there was an error. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error. Please try again.');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={handleClose}>
          ×
        </button>
        
        {!isSubmitted ? (
          <>
            <div className={styles.header}>
              <h2>Welcome to Cam-Cat!</h2>
              <p>We're excited to have you here. Stay connected for exclusive offers and updates!</p>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your name"
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="subscribe"
                    checked={formData.subscribe}
                    onChange={handleInputChange}
                  />
                  <span className={styles.checkboxText}>
                    Subscribe to receive exclusive offers, event updates, and photography tips
                  </span>
                </label>
              </div>
              
              <button type="submit" className={styles.submitButton}>
                Get Started
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successMessage}>
            <h3>Thank you!</h3>
            <p>Welcome to the CamCat family! We'll be in touch soon with amazing offers and updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}

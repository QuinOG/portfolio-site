import { useState, useEffect } from 'react';

/**
 * Custom hook to detect element visibility in viewport
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0 to 1)
 * @param {string} options.root - Root element (defaults to viewport)
 * @param {string} options.rootMargin - Root margin
 * @returns {[React.RefObject, boolean]} - [ref to observe, isVisible state]
 */
const useIntersectionObserver = (options = {}) => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Skip if ref not set
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        threshold: options.threshold || 0.1,
        root: options.root || null,
        rootMargin: options.rootMargin || '0px'
      }
    );

    observer.observe(ref);

    return () => {
      observer.unobserve(ref);
      observer.disconnect();
    };
  }, [ref, options.threshold, options.root, options.rootMargin]);

  return [setRef, isVisible];
};

export default useIntersectionObserver;
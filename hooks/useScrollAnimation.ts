"use client";

import { useEffect } from "react";

/**
 * Custom hook to replace AOS library with lightweight Intersection Observer
 * Adds 'is-visible' class to elements with 'animate-on-scroll' class when they enter viewport
 * Uses MutationObserver to handle dynamically added elements (route changes)
 */
export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('is-visible')) {
            entry.target.classList.add('is-visible');
            // Disconnect after animation to save resources
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe existing elements
    const observeElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-delayed');
      elements.forEach((element) => {
        if (!element.classList.contains('is-visible')) {
          observer.observe(element);
        }
      });
    };

    // Initial observation
    observeElements();

    // Watch for new elements being added to the DOM (for route changes)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []); // Only run once on mount
}

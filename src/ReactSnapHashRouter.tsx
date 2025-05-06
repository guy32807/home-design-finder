import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';

interface ReactSnapHashRouterProps {
  children: React.ReactNode;
}

// This component allows react-snap to work with HashRouter
const ReactSnapHashRouter: React.FC<ReactSnapHashRouterProps> = ({ children }) => {
  // Check if we're running in the context of react-snap
  const isSnapshot = 
    navigator.userAgent.includes('HeadlessChrome') || 
    window.location.href.includes('?snapshot');

  // Extract path for snapshot mode
  const path = isSnapshot 
    ? (window.location.search.substring(1) || '/') 
    : '';

  // Always call useEffect, but only add the script if it's a snapshot
  useEffect(() => {
    if (isSnapshot) {
      const script = document.createElement('script');
      script.innerHTML = `
        window.onload = function() {
          window.location.href = '/#${path}';
        }
      `;
      document.head.appendChild(script);
    }
  }, [isSnapshot, path]);

  // Use conditional rendering, not conditional hook calls
  if (isSnapshot) {
    return <>{children}</>;
  }

  // Normal rendering with HashRouter for client-side
  return <HashRouter>{children}</HashRouter>;
};

export default ReactSnapHashRouter;
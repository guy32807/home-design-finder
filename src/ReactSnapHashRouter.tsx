import React from 'react';
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

  // When react-snap is running, use the path from the query string
  if (isSnapshot) {
    const path = window.location.search.substring(1) || '/';
    
    // Add a script that will redirect to the hash route when the page loads
    React.useEffect(() => {
      const script = document.createElement('script');
      script.innerHTML = `
        window.onload = function() {
          window.location.href = '/#${path}';
        }
      `;
      document.head.appendChild(script);
    }, [path]);

    // Return children directly without HashRouter during snapshot
    return <>{children}</>;
  }

  // Normal rendering with HashRouter for client-side
  return <HashRouter>{children}</HashRouter>;
};

export default ReactSnapHashRouter;
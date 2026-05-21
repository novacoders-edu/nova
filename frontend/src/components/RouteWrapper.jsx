import React from 'react';
import useScrollRestoration from '../hooks/useScrollRestoration';
import { useLocation } from 'react-router-dom';

// Hook must always be called — branch the effect inside the hook instead
const RouteWrapper = ({ children, preserveScroll = true, scrollKey = null }) => {
  const location = useLocation();
  // Always call the hook; pass null when disabled so the hook can no-op internally
  useScrollRestoration(preserveScroll ? (scrollKey || location.pathname) : null);
  return <>{children}</>;
};

export default RouteWrapper;

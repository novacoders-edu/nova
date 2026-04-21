import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingScreen from '../components/ui/LoadingScreen'
import Signin from '../components/SignIn';
import ProtectedRoute from '../components/ProtectedRoute';

// Lazy load all components for better code splitting
const Home = React.lazy(() => import('../pages/Home'));
const About = React.lazy(() => import('../pages/About'));
const Portfolio = React.lazy(() => import('../pages/Portfolio'));
const Services = React.lazy(() => import('../pages/Services'));
const AuthPage = React.lazy(() => import('../pages/AuthPage'));
const NotFound = React.lazy(() => import('../pages/NotFound'));
const Admin = React.lazy(() => import('../pages/admin/Admin'));
const CertificateVerify = React.lazy(() => import('../pages/CertificateVerify'));



const MainRoutes = () => {
  return (
    <div>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/signin" element={<Signin />} />
          
          {/* Protected Admin Dashboard - only accessible by admins */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <Admin />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/verify-certificate" element={<CertificateVerify />} />
          {/* Catch-all route for 404 - must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default MainRoutes

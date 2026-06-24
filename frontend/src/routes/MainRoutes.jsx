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
const Event = React.lazy(() => import('../pages/Events'))
const Contact = React.lazy(() => import('../pages/Contact'))
const PrivacyPolicy = React.lazy(() => import('../pages/PrivacyPolicy'))
const Terms = React.lazy(() => import('../pages/Terms'))
const HackthonHighlights = React.lazy(() => import('../pages/HackthonHighlights'))
const Careers = React.lazy(() => import('../pages/Careers'))

const Demo = React.lazy(() => import('../pages/Demo'))



const MainRoutes = () => {
  return (
    <div>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* /home redirects to / to avoid duplicate content */}
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path='/events' element={<Event />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/demo' element={<Demo />} />
          <Route path='/hackathon-highlights' element={<HackthonHighlights />} />
          <Route path='/careers' element={<Careers />} />
          
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

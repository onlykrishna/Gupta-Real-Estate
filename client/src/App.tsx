import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/* Layouts & Auth */
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import PrivateRoute from './components/PrivateRoute';

/* Lazy loaded Pages chunking via Suspense */
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const PropertiesPage = React.lazy(() => import('./pages/PropertiesPage'));
const PropertyDetailPage = React.lazy(() => import('./pages/PropertyDetailPage'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const PropertyListings = React.lazy(() => import('./pages/admin/PropertyListings'));
const PropertyForm = React.lazy(() => import('./pages/admin/PropertyForm'));
const LeadsDashboard = React.lazy(() => import('./pages/admin/LeadsDashboard'));

const GlobalLazyLoader = () => (
  <div className="min-h-screen bg-warm-white flex flex-col">
    <div className="h-20 bg-white/50 border-b border-slate-100 flex items-center px-8 animate-pulse">
       <div className="w-32 h-6 bg-slate-100 rounded-full"></div>
    </div>
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 md:p-12 space-y-12">
       <div className="space-y-4">
          <div className="h-16 bg-white rounded-3xl w-1/2 animate-pulse"></div>
          <div className="h-4 bg-slate-100 rounded-full w-1/4 animate-pulse"></div>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[1,2,3].map(i => (
            <div key={i} className="aspect-[4/5] bg-white rounded-[3rem] animate-pulse"></div>
          ))}
       </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<GlobalLazyLoader />}>
        <Routes>
          {/* Public Application Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:id" element={<PropertyDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          
          {/* Admin Pre-Auth */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Console */}
          <Route path="/admin" element={<PrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="listings" element={<PropertyListings />} />
              <Route path="property/add" element={<PropertyForm />} />
              <Route path="property/edit/:id" element={<PropertyForm />} />
              <Route path="leads" element={<LeadsDashboard />} />
            </Route>
          </Route>

          <Route path="*" element={<div className="p-8 text-center text-red-500 font-bold">404 - Page Route Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;

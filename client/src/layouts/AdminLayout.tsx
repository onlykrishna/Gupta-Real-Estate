import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import axiosInstance from '../api/axios';

const AdminLayout: React.FC = () => {
  const { admin, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      // 1. Tell the backend to clear the httpOnly cookie
      await axiosInstance.post('/admin/logout');
    } catch (error) {
      console.error('Error hitting logout endpoint', error);
    } finally {
      // 2. Regardless of API success, clear local state and redirect
      logout();
      navigate('/admin/login');
    }
  };

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Listings', path: '/admin/listings' },
    { name: 'Leads', path: '/admin/leads' },
    { name: 'Add Property', path: '/admin/property/add' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="text-white font-bold text-lg tracking-wide shadow-sm">
            GUPTA <span className="text-blue-500">REALTY</span>
          </span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
          <div className="flex items-center text-slate-800 font-medium">
            Welcome, {admin?.name || 'Admin'}
          </div>
          
          <button 
            onClick={handleLogout}
            className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors flex items-center gap-2 px-3 py-1.5 rounded hover:bg-slate-100"
          >
            Log Out
          </button>
        </header>

        {/* Dynamic Outlet for nested routes */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

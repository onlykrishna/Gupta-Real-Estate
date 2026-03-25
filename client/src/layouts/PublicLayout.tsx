import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const PublicLayout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-warm-white selection:bg-gold/30 selection:text-navy scroll-gpu">
      {/* Premium Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 flex items-center ${
        isHome 
          ? 'bg-transparent border-transparent' 
          : 'bg-white/95 border-b border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <div className={`w-10 h-10 flex items-center justify-center font-serif font-black text-xl rounded-xl transition-all duration-300 ${
              isHome ? 'bg-gold text-navy rotate-3 group-hover:rotate-12' : 'bg-navy text-white rotate-0 group-hover:rotate-6'
            }`}>G</div>
            <div className={`font-serif font-black text-2xl tracking-tighter transition-colors ${
              isHome ? 'text-white' : 'text-navy'
            }`}>
              GUPTA<span className="text-gold">ESTATES</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {[
              { name: 'Home', path: '/' },
              { name: 'Properties', path: '/properties' },
              { name: 'About Us', path: '/about' },
              { name: 'Services', path: '/services' },
              { name: 'Contact', path: '/contact' },
            ].map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-300 hover:text-gold relative group ${
                  location.pathname === link.path 
                    ? 'text-gold' 
                    : (isHome ? 'text-white/80' : 'text-navy/70')
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              to="/admin/login" 
              className={`text-xs font-black tracking-widest uppercase px-6 py-3 rounded-full transition-all ${
                isHome 
                  ? 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20' 
                  : 'bg-navy text-white hover:bg-navy/90 border border-transparent shadow-lg shadow-navy/20'
              }`}
            >
              Portal Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Modern Footer */}
      <footer className="bg-navy py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="font-serif font-black text-3xl tracking-tighter mb-8">
                GUPTA<span className="text-gold">ESTATES</span>
              </div>
              <p className="text-slate-400 text-lg max-w-sm mb-10 leading-relaxed font-medium">
                Pioneering the benchmark of premium real estate through integrity, innovation, and an unwavering commitment to excellence since 1998.
              </p>
              <div className="flex gap-4">
                {['fb', 'tw', 'ig', 'li'].map((s) => (
                  <div key={s} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-gold hover:border-gold/50 cursor-pointer transition-all">
                    <span className="text-[10px] font-black uppercase text-inherit">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-sm tracking-[0.2em] mb-8 text-gold uppercase">Contact</h4>
              <ul className="space-y-4 text-slate-400 font-bold">
                <li>Corporate Office, South Delhi</li>
                <li>contact@guptaestates.com</li>
                <li>+91 (11) 4500 2321</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black text-sm tracking-[0.2em] mb-8 text-gold uppercase">Quick Links</h4>
              <ul className="space-y-4 text-slate-400 font-bold">
                <li><Link to="/properties" className="hover:text-white transition-colors">Residential Properties</Link></li>
                <li><Link to="/properties" className="hover:text-white transition-colors">Commercial Units</Link></li>
                <li><Link to="/admin" className="hover:text-white transition-colors">Client Portal</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs font-bold tracking-widest">
            <div>© 2026 GUPTA REAL ESTATE PVT LTD</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-gold transition-colors">PRIVACY POLICY</a>
              <a href="#" className="hover:text-gold transition-colors">TERMS OF SERVICE</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;

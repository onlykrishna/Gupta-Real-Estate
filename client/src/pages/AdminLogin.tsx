import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useAuthStore } from '../store/authStore';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post('/admin/login', { email, password });
      setAuth(response.data.admin);
      navigate('/admin/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Unauthorized access. Verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-navy overflow-hidden font-sans">
      {/* Background Orbs for Senior Aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full"></div>

      <div className="max-w-md w-full perspective-1000">
        <div className="bg-white/5 backdrop-blur-2xl p-12 rounded-[2.5rem] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transform transition-all duration-700 animate-fade-in-up">
          
          <div className="text-center mb-12">
            <Link to="/" className="inline-block mb-8">
               <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center text-navy font-serif font-black text-3xl shadow-xl shadow-gold/20 rotate-3 hover:rotate-0 transition-transform duration-500">G</div>
            </Link>
            <h2 className="text-3xl font-serif font-black text-white tracking-tight mb-2 uppercase">Portal Access</h2>
            <div className="h-1 w-12 bg-gold mx-auto rounded-full"></div>
            <p className="text-slate-400 text-xs mt-4 font-black tracking-[0.3em] uppercase opacity-70">Secured Administrative Gateway</p>
          </div>

          {error && (
            <div className="mb-8 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400 flex items-center gap-3 animate-shake">
              <span className="text-lg">⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-gold transition-colors">Identification</label>
              <div className="relative">
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full pl-0 pr-4 py-3 bg-transparent border-b-2 border-white/10 focus:border-gold outline-none transition-all font-bold text-white placeholder-white/10 text-lg"
                  placeholder="admin@guptaestates.com"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-gold transition-colors">Security Key</label>
              <div className="relative">
                <input
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full pl-0 pr-4 py-3 bg-transparent border-b-2 border-white/10 focus:border-gold outline-none transition-all font-bold text-white placeholder-white/10 text-lg tracking-widest"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="group relative w-full py-5 bg-gold hover:bg-white text-navy font-black text-xs tracking-[0.3em] uppercase rounded-2xl transition-all duration-500 shadow-2xl shadow-gold/10 overflow-hidden active:scale-95 disabled:opacity-50"
            >
              <span className="relative z-10">{loading ? 'Verifying Credentials...' : 'Unlock Console'}</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </form>

          <Link to="/" className="block text-center mt-10 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-gold transition-colors">
            ← Return to Public Sanctuary
          </Link>
        </div>
        
        <p className="text-center mt-8 text-slate-600 text-[9px] font-bold tracking-[0.4em] uppercase opacity-40">
          Encrypted Session • © 2026 Gupta Estates
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

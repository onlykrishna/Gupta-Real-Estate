import React, { useState } from 'react';
import axiosInstance from '../api/axios';

interface InquiryFormProps {
  propertyId: string;
  onSuccess?: () => void;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ propertyId, onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      await axiosInstance.post('/leads', { ...formData, propertyId });
      setStatusMsg({ type: 'success', text: 'Thank you! Your inquiry has been sent. Our premium agent will contact you shortly.' });
      setFormData({ name: '', phone: '', email: '', message: '' });
      if (onSuccess) {
        setTimeout(onSuccess, 3000);
      }
    } catch (error: any) {
      console.error(error);
      const errorText = error.response?.data?.errors?.[0]?.message || error.response?.data?.message || 'Failed to submit inquiry. Please try again.';
      setStatusMsg({ type: 'error', text: errorText });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {statusMsg && (
        <div className={`p-6 rounded-2xl font-bold text-sm flex items-center gap-3 animate-fade-in ${statusMsg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          <span className="text-xl">{statusMsg.type === 'success' ? '✓' : '⚠'}</span>
          {statusMsg.text}
        </div>
      )}
      
      <div className="space-y-4">
        {[
          { label: 'Full Name', type: 'text', key: 'name', placeholder: 'e.g. Rahul Sharma' },
          { label: 'Mobile Number', type: 'tel', key: 'phone', placeholder: '+91 98765 43210' },
          { label: 'Email Address', type: 'email', key: 'email', placeholder: 'rahul@example.com' },
        ].map((field) => (
          <div key={field.key} className="space-y-2 group">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-gold transition-colors">{field.label}</label>
            <input 
              type={field.type} required placeholder={field.placeholder}
              value={(formData as any)[field.key]} onChange={e => setFormData({...formData, [field.key]: e.target.value})}
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-bold text-white placeholder-white/20" 
            />
          </div>
        ))}
        
        <div className="space-y-2 group">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-gold transition-colors">Personal Message</label>
          <textarea 
            required rows={4} placeholder="Tell us about your requirements..." 
            value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-medium text-white placeholder-white/20 resize-none" 
          />
        </div>
      </div>

      <button 
        type="submit" disabled={loading} 
        className="group relative w-full py-5 bg-gold hover:bg-white text-navy font-black text-xs tracking-[0.3em] uppercase rounded-2xl shadow-xl shadow-gold/10 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 overflow-hidden"
      >
        <span className="relative z-10">{loading ? 'Transmitting Inqury...' : 'Begin Consultation'}</span>
        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </button>
      
      <p className="text-[9px] text-center text-slate-500 font-bold tracking-widest uppercase opacity-50">Secure & Confidential Consultation</p>
    </form>
  );
};

export default InquiryForm;

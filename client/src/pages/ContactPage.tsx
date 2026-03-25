import React from 'react';
import { Helmet } from 'react-helmet-async';

const ContactPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-warm-white">
      <Helmet>
        <title>Connect with Us | Gupta Real Estate</title>
        <meta name="description" content="Reach out to Gupta Real Estate for premium property consultations." />
      </Helmet>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24 lg:flex lg:gap-20 items-stretch">
        <div className="lg:w-1/2 flex flex-col justify-center">
          <span className="text-[11px] font-black tracking-[0.3em] text-gold uppercase mb-6 block">Ready to Explore?</span>
          <h1 className="text-5xl md:text-7xl font-serif font-black text-navy leading-tight mb-10">
            Let's <span className="text-gold italic">Connect</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed mb-16 lg:max-w-lg">
            Our luxury property consultants are ready to help you find your next sanctuary. Whether you're looking for a new home or an investment Opportunity.
          </p>

          <div className="space-y-10">
            <div className="flex gap-6 items-start">
               <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gold shadow-sm shrink-0 border border-slate-100">🏠</div>
               <div>
                  <h4 className="font-serif font-black text-navy text-xl mb-2">Sanctuary HQ</h4>
                  <p className="text-slate-500 text-sm font-bold">128, Golf Links, New Delhi - 110003</p>
               </div>
            </div>
            <div className="flex gap-6 items-start">
               <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gold shadow-sm shrink-0 border border-slate-100">📞</div>
               <div>
                  <h4 className="font-serif font-black text-navy text-xl mb-2">Connect Directly</h4>
                  <p className="text-slate-500 text-sm font-bold">+91 11-4500-2300</p>
               </div>
            </div>
            <div className="flex gap-6 items-start">
               <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gold shadow-sm shrink-0 border border-slate-100">✉️</div>
               <div>
                  <h4 className="font-serif font-black text-navy text-xl mb-2">Write to Us</h4>
                  <p className="text-slate-500 text-sm font-bold">consult@guptaestates.com</p>
               </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 mt-20 lg:mt-0">
          <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-slate-50">
             <h3 className="font-serif font-black text-3xl text-navy mb-8">Send a Message</h3>
             <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                      <input type="text" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-navy font-bold focus:ring-2 focus:ring-gold transition-all" placeholder="John Doe" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                      <input type="email" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-navy font-bold focus:ring-2 focus:ring-gold transition-all" placeholder="john@example.com" />
                   </div>
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message Inquiry</label>
                   <textarea rows={6} className="w-full bg-slate-50 border-none rounded-3xl py-4 px-6 text-navy font-bold focus:ring-2 focus:ring-gold transition-all resize-none" placeholder="I'm interested in..." />
                </div>
                <button className="w-full py-6 bg-navy text-gold font-black text-xs tracking-widest uppercase rounded-2xl hover:bg-gold hover:text-navy transition-all duration-300 shadow-xl shadow-navy/20 active:scale-95">Send Inquiry</button>
             </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="h-[500px] w-full bg-slate-200 rounded-[3.5rem] overflow-hidden grayscale relative border-8 border-white shadow-2xl shadow-navy/5">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-8 bg-white/90 backdrop-blur-md rounded-3xl flex flex-col items-center">
              <div className="w-12 h-12 bg-navy text-gold rounded-full flex items-center justify-center font-black mb-4">G</div>
              <p className="font-black text-navy text-sm uppercase tracking-widest">Gupta Estates HQ</p>
            </div>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80" 
            alt="Cityscape Map Placeholder" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

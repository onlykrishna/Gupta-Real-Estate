import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-warm-white font-sans overflow-x-hidden">
      <Helmet>
        <title>Gupta Real Estate | Premium Property Solutions</title>
        <meta name="description" content="Elevate your lifestyle with Gupta Real Estate. Discover premium properties in the most sought-after locations." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Luxury Home" 
            className="w-full h-full object-cover scale-110 animate-[pulse_20s_infinite]"
          />
          <div className="absolute inset-0 bg-navy/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-gold/20 border border-gold/30 text-gold rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 animate-fade-in">
            ESTABLISHED 1998
          </span>
          <h1 className="text-5xl md:text-8xl font-serif font-black text-white tracking-tighter leading-none mb-8 drop-shadow-2xl">
            Finding Your <br/>
            <span className="text-gold italic">Dream Sanctuary</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto mb-10 font-medium leading-relaxed opacity-90">
            Specializing in premium residential estates and high-yield commercial investments across India's most prestigious corridors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/properties" 
              className="group relative px-10 py-5 bg-gold text-navy font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(201,168,76,0.4)]"
            >
              <span className="relative z-10">EXPLORE PROPERTIES</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
            <Link 
              to="/admin/login" 
              className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-full hover:bg-white/20 transition-all"
            >
              ADMIN ACCESS
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-1 h-12 bg-gradient-to-b from-transparent to-white rounded-full"></div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'PROPERTIES SOLD', val: '2,500+' },
            { label: 'HAPPY FAMILIES', val: '1,800+' },
            { label: 'AWARDS WON', val: '45' },
            { label: 'YEARS EXPERIENCE', val: '25' }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-serif font-black text-navy mb-2">{stat.val}</div>
              <div className="text-xs font-bold text-slate-400 tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-serif font-bold text-slate-50 opacity-10 select-none">"</div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <span className="text-[10px] font-black tracking-[0.4em] text-gold uppercase mb-8 block">Distinguished Clients</span>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-navy mb-16">The Word of <span className="text-gold italic">Trust</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { 
                text: "Gupta Real Estate doesn't just find houses; they find legacies. Their attention to architectural detail and legal precision is unmatched in the Indian market.",
                author: "Vikram Malhotra",
                title: "CEO, TechSphere India"
              },
              { 
                text: "As an NRI, I needed a partner I could trust blindly. The team at Gupta Estates provided end-to-end transparency and helped me secure a gem in South Delhi.",
                author: "Anjali Sharma",
                title: "Director, Global Ventures UAE"
              }
            ].map((t, i) => (
              <div key={i} className="p-12 bg-warm-white rounded-[3rem] text-left border border-slate-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-700">
                <p className="text-xl text-navy italic font-medium leading-relaxed mb-10">"{t.text}"</p>
                <div>
                  <div className="font-serif font-black text-lg text-navy">{t.author}</div>
                  <div className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured CTA */}
      <section className="py-32 bg-navy flex flex-col items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&w=1920&q=80')] bg-fixed bg-cover bg-center opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-serif font-black text-white mb-8 leading-tight">
            Elevate Your <span className="text-gold italic">Standards</span>
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium">
             Join the elite circle of homeowners who demand nothing less than perfection.
          </p>
          <Link 
            to="/contact" 
            className="px-12 py-6 bg-gold text-navy font-black text-xs tracking-[0.3em] uppercase rounded-full hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-gold/20"
          >
            Request Private Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

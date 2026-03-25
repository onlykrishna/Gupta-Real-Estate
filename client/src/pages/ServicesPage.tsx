import React from 'react';
import { Helmet } from 'react-helmet-async';

const ServicesPage: React.FC = () => {
  return (
    <div className="pt-24 md:pt-32 pb-24 bg-warm-white">
      <Helmet>
        <title>Our Services | Gupta Real Estate</title>
        <meta name="description" content="Explore our range of premium real estate services including management, consulting, and research." />
      </Helmet>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <span className="text-[11px] font-black tracking-[0.3em] text-gold uppercase mb-6 block">Our Expertise</span>
        <h1 className="text-5xl md:text-7xl font-serif font-black text-navy mb-10">
          Elevated <span className="text-gold italic underline decoration-gold/30">Property Solutions</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed mb-24">
          Beyond simply matching buyers with sellers, we provide a holistic suite of services designed to maximize investment potential and simplify the luxury living experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            { 
              title: 'Portfolio Management', 
              icon: '💼', 
              desc: 'For the high-net-worth investor, we provide strategic management of real estate assets across multiple markets to maximize yields.' 
            },
            { 
              title: 'Legal Advisory', 
              icon: '⚖️', 
              desc: 'Property transactions can be complex. Our in-house legal experts ensure that every single document is perfect.' 
            },
            { 
              title: 'Interior Design', 
              icon: '🎨', 
              desc: 'From architectural shells to fully realized sanctuaries, our partner designers create bespoke living environments.' 
            },
            { 
              title: 'Market Research', 
              icon: '📊', 
              desc: 'Detailed feasibility studies and market trend analysis to help you make informed investment decisions.' 
            },
            { 
              title: 'Relocation Services', 
              icon: '✈️', 
              desc: 'Seamless international and domestic relocation support, including neighborhood selection and school placements.' 
            },
            { 
              title: 'Property Valuation', 
              icon: '🏷️', 
              desc: 'Accurate, data-driven property valuation services using modern algorithms and historical market data.' 
            }
          ].map((s, i) => (
            <div key={i} className="p-12 bg-white rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-100 hover:shadow-2xl hover:border-gold/30 transition-all duration-500 group">
              <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 block">{s.icon}</div>
              <h3 className="text-2xl font-serif font-black text-navy mb-5">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy py-32 mt-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-3xl rounded-full translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif font-black text-white mb-10 leading-tight">Need a <span className="text-gold italic">bespoke solution?</span></h2>
          <p className="text-slate-400 text-lg mb-16 max-w-2xl mx-auto">Discuss your specific requirements with our senior consultants who specialize in high-value property portfolios.</p>
          <a href="/contact" className="px-12 py-6 bg-gold text-navy font-black text-xs tracking-widest uppercase rounded-full hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-gold/20">Book a Consultation</a>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

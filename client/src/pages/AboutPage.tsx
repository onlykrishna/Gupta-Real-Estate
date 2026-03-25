import React from 'react';
import { Helmet } from 'react-helmet-async';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-warm-white">
      <Helmet>
        <title>Our Heritage | Gupta Real Estate</title>
        <meta name="description" content="Since 1998, Gupta Real Estate has been the gold standard for luxury property in India." />
      </Helmet>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[11px] font-black tracking-[0.3em] text-gold uppercase mb-6 block">Our Legacy</span>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-navy leading-tight mb-10">
              Redefining <br/>
              <span className="text-gold italic">Luxury Living</span> Since 1998
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-medium mb-12">
              At Gupta Real Estate, we don't just sell properties; we curate sanctuaries. With over two decades of experience, we have become the trusted partner for India's most discerning homeowners and investors.
            </p>
            <div className="flex gap-12">
              <div>
                <div className="text-4xl font-serif font-black text-navy mb-2">25+</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Years of Excellence</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-black text-navy mb-2">5,000+</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sanctuaries Curated</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&w=1000&q=80" 
                alt="Architecture" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-navy p-10 rounded-3xl shadow-2xl hidden md:block">
              <p className="text-white font-serif italic text-2xl mb-4">"Integrity is the bedrock of every foundation we lay."</p>
              <p className="text-gold font-black text-xs tracking-widest uppercase">— RAJESH GUPTA, FOUNDER</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-navy py-32 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-serif font-black mb-8">Guided by Excellence</h2>
            <p className="text-slate-400 text-lg">Our four pillars of operation ensure that every client receives a personalized experience that transcends the transactional.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: 'Curated Portfolios', desc: 'Every property in our inventory undergoes a rigorous selection process to ensure it meet our standards of luxury and value.' },
              { title: 'Global Vision', desc: 'Merging international architectural trends with local heritage, we bring a global perspective to the Indian real estate market.' },
              { title: 'Transparent Process', desc: 'We believe in absolute clarity. From documentation to final handover, our processes are open, honest, and legally foolproof.' },
              { title: 'Lifelong Partnership', desc: 'Our relationship doesn\'t end at the sale. We offer comprehensive after-sales support and portfolio management services.' }
            ].map((p, i) => (
              <div key={i} className="group p-10 bg-white/5 border border-white/10 rounded-3xl hover:bg-gold hover:translate-y-[-10px] transition-all duration-500">
                <div className="text-gold font-black text-5xl mb-8 group-hover:text-navy transition-colors">0{i+1}</div>
                <h3 className="text-xl font-black mb-4 group-hover:text-navy transition-colors">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-navy/70 transition-colors">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

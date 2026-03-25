import React from 'react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: {
    _id: string;
    title: string;
    price: number;
    bhk: number;
    area: number;
    location: string;
    images: string[];
    category: string;
  }
}

const PropertyCard: React.FC<PropertyCardProps> = React.memo(({ property }) => {
  const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5001';
  const imageUrl = property.images && property.images.length > 0 
    ? `${baseUrl}${property.images[0]}`
    : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80';

  return (
    <div 
      className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 will-change-transform hover:-translate-y-2 flex flex-col h-full"
      style={{ contain: 'layout size style', contentVisibility: 'auto' }}
    >
      {/* Visual Anchor */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 [backface-visibility:hidden]">
        <Link to={`/properties/${property._id}`} className="block h-full">
          <img 
            src={imageUrl} 
            loading="lazy"
            alt={property.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 [backface-visibility:hidden]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </Link>
        
        {/* Category Badge - Performance Optimized */}
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="bg-white/95 px-4 py-1.5 rounded-full text-[10px] font-black text-navy tracking-widest uppercase shadow-sm border border-slate-50">
            {property.category}
          </span>
        </div>

        {/* Price Overlay */}
        <div className="absolute bottom-6 left-6 text-white text-2xl font-serif font-black drop-shadow-lg">
          ₹{property.price.toLocaleString('en-IN')}
        </div>
      </div>

      {/* Detail Core */}
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
             <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
             <span className="text-[10px] font-black tracking-[0.2em] text-gold uppercase">Exclusive Listing</span>
          </div>
          <Link to={`/properties/${property._id}`}>
            <h3 className="text-xl md:text-2xl font-serif font-black text-navy group-hover:text-gold transition-colors line-clamp-2 leading-tight mb-4">
              {property.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-slate-400 font-bold text-xs mb-6 tracking-wide">
            <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
            <span className="truncate">{property.location}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between py-4 border-y border-slate-50">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Configuration</span>
              <span className="text-sm font-black text-navy">{property.bhk} BHK Premium</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Area</span>
              <span className="text-sm font-black text-navy">{property.area} Sqft</span>
            </div>
          </div>
          
          <Link 
            to={`/properties/${property._id}`} 
            className="group/btn flex items-center justify-center gap-3 w-full py-4 bg-navy hover:bg-gold text-white hover:text-navy font-black text-xs tracking-widest uppercase rounded-2xl transition-all duration-300 shadow-xl shadow-navy/10 active:scale-95"
          >
            Explore Sanctuary
            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default PropertyCard;

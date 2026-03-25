import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useSWR from 'swr';
import { Helmet } from 'react-helmet-async';
import axiosInstance from '../api/axios';
import InquiryForm from '../components/InquiryForm';

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [showMobileModal, setShowMobileModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data: property, error, isLoading } = useSWR(`/properties/${id}`, fetcher);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-warm-white">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-gold"></div>
    </div>
  );
  if (error || !property) return <div className="min-h-screen flex items-center justify-center font-bold text-2xl text-slate-500">Property Not Found</div>;

  const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
  const images = property.images?.length > 0 ? property.images.map((img: string) => `${baseUrl}${img}`) : ['https://via.placeholder.com/800x600?text=No+Image'];

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
  const encodedAddress = encodeURIComponent(property.address);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${encodedAddress}`;

  const currentUrl = encodeURIComponent(window.location.href);
  const whatsappUrl = `https://wa.me/919876543210?text=I'm%20interested%20in%20${encodeURIComponent(property.title)}%20-%20${currentUrl}`;
  const callUrl = "tel:+919876543210";

  return (
    <div className="min-h-screen bg-warm-white pb-28 lg:pb-16 font-sans">
      <Helmet>
        <title>{`${property.title} - ${property.bhk} BHK in ${property.location} | Gupta Real Estate`}</title>
        <meta name="description" content={`Check out this ${property.bhk} BHK ${property.category} property located at ${property.location}. Price: ₹${property.price.toLocaleString('en-IN')}`} />
        <meta property="og:title" content={`${property.title} - ${property.bhk} BHK in ${property.location} | Gupta Real Estate`} />
        <meta property="og:description" content={`See details for ${property.title}.`} />
        {images.length > 0 && <meta property="og:image" content={images[0]} />}
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      {/* Top Navbar - Performance Tuned */}
      <header className="bg-white/95 border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="font-serif font-black text-2xl tracking-tighter text-navy drop-shadow-sm">
            GUPTA<span className="text-gold">ESTATES</span>
          </div>
          <Link to="/properties" className="text-sm font-bold bg-slate-100 hover:bg-slate-200 text-navy px-5 py-2.5 rounded-full transition-colors inline-block">
            ← Back to Search
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title Block */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-navy text-gold uppercase text-xs font-black px-3 py-1.5 rounded-lg tracking-wider">
                {property.category}
              </span>
              {!property.isAvailable && (
                <span className="bg-red-100 text-red-700 uppercase text-xs font-black px-3 py-1.5 rounded-lg tracking-wider">
                  Sold Out
                </span>
              )}
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-black text-navy tracking-tight leading-tight">{property.title}</h1>
            <p className="text-slate-500 mt-2 text-xl font-medium">📍 {property.location}</p>
          </div>
          <div className="text-left md:text-right bg-white p-5 rounded-2xl shadow-sm border border-slate-200 inline-block">
            <p className="text-sm text-slate-500 uppercase font-black tracking-widest mb-1">Asking Price</p>
            <p className="text-4xl font-black text-navy">₹{property.price.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content */}
          <div className="flex-1 space-y-10">
            {/* Gallery Content */}
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 p-2">
              <div className="w-full h-[400px] lg:h-[550px] rounded-[1.5rem] overflow-hidden bg-slate-900 mb-3 relative group">
                <img 
                   src={images[activeImage]} 
                   srcSet={`${images[activeImage]} 1x`}
                   loading="lazy"
                   alt="Main profile view" 
                   className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 px-2 pt-1">
                  {images.map((img: string, idx: number) => (
                    <button 
                      key={idx} 
                      onClick={() => setActiveImage(idx)}
                      className={`flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden border-[3px] transition-all shadow-sm ${activeImage === idx ? 'border-navy opacity-100 scale-105' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'}`}
                    >
                      <img src={img} loading="lazy" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Facts */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm border border-slate-100">🛏️</div>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Bedrooms</p>
                <p className="text-2xl font-black text-navy">{property.bhk}</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm border border-slate-100">📐</div>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Area Size</p>
                <p className="text-2xl font-black text-navy">{property.area} <span className="text-sm text-slate-500 font-bold">sqft</span></p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm border border-slate-100">🏷️</div>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Status</p>
                <p className="text-xl font-black text-navy mt-1">{property.isAvailable ? 'Available' : 'Sold Out'}</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm border border-slate-100">🏢</div>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Type</p>
                <p className="text-xl font-black text-navy capitalize mt-1">{property.category}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10">
              <h3 className="text-2xl font-serif font-black text-navy mb-6">About this property</h3>
              <div className="prose text-slate-600 max-w-none whitespace-pre-wrap leading-relaxed font-medium">
                {property.description}
              </div>
            </div>

            {/* Virtual Tour */}
            {property.virtualTourUrl && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10">
                <h3 className="text-2xl font-serif font-black text-navy mb-6">360° Virtual Tour</h3>
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-100 shadow-inner">
                  <iframe src={property.virtualTourUrl} width="100%" height="100%" frameBorder="0" allowFullScreen loading="lazy"></iframe>
                </div>
              </div>
            )}

            {/* Location / Google Maps */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10">
              <h3 className="text-2xl font-serif font-black text-navy mb-3">Location Preview</h3>
              <p className="text-slate-600 mb-6 font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">{property.address}</p>
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-200">
                {mapsApiKey && mapsApiKey !== 'YOUR_GOOGLE_MAPS_KEY_HERE' ? (
                  <iframe width="100%" height="100%" frameBorder="0" src={mapUrl} allowFullScreen loading="lazy"></iframe>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100 font-bold border-2 border-dashed border-slate-300">
                    <p>Google Maps API Key not configured in EVN</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar / Desktop Sticky Inquiry */}
          <div className="hidden lg:block w-[420px]">
             {/* Unchanged Layout elements preserved for time constraint */}
            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 sticky top-28 p-1">
               <div className="bg-navy rounded-[1.8rem] px-8 py-10 text-white">
                 <h3 className="text-2xl font-black mb-2 flex items-center gap-2 font-serif text-gold">
                   <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                   Express Interest
                 </h3>
                 <p className="text-slate-400 text-sm mb-8 font-medium leading-relaxed">Schedule a private viewing. Our premium agents answer within 5 minutes.</p>
                 
                 <InquiryForm propertyId={property._id} />

                 <div className="mt-8 pt-8 border-t border-slate-700/50 flex flex-col gap-4">
                   <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full py-4 text-center bg-[#25D366] hover:bg-[#1faa51] text-white font-black rounded-xl shadow-[0_4px_15px_rgba(37,211,102,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                       WhatsApp Message
                   </a>
                   <a href={callUrl} className="w-full py-4 text-center bg-white hover:bg-slate-100 text-navy font-black rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                      Direct Voice Track
                   </a>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

       {/* Mobile Modal Inquiry Overlay */}
       {showMobileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:hidden">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowMobileModal(false)}></div>
           <div className="bg-white w-full max-w-md rounded-[2rem] p-8 shadow-2xl relative z-10 animate-fade-in-up">
              <button 
                onClick={() => setShowMobileModal(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold hover:bg-slate-200"
              >✕</button>
              <h3 className="text-2xl font-serif font-black mb-2 text-navy">Express Interest</h3>
              <p className="text-slate-500 text-sm mb-6 font-medium">Leave your details and an agent will call you back.</p>
              <InquiryForm propertyId={property._id} onSuccess={() => setShowMobileModal(false)} />
           </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 bg-white/95 backdrop-blur-xl border border-slate-200 p-2 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] z-40 flex shadow-xl divide-x divide-slate-100">
        <a href={callUrl} className="flex-1 py-3 text-slate-700 hover:bg-slate-50 font-black rounded-l-xl flex items-center justify-center text-sm gap-1"> Call </a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 text-[#25D366] hover:bg-green-50 font-black flex items-center justify-center text-sm gap-1"> WhatsApp </a>
        <button onClick={() => setShowMobileModal(true)} className="flex-[1.5] py-3 text-gold bg-navy hover:bg-slate-800 font-black rounded-r-xl tracking-wide">
           Inquire
        </button>
      </div>
      
    </div>
  );
};

export default PropertyDetailPage;

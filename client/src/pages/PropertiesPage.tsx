import React, { useState } from 'react';
import useSWR from 'swr';
import { Helmet } from 'react-helmet-async';
import axiosInstance from '../api/axios';
import PropertyCard from '../components/PropertyCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

const PropertiesPage: React.FC = () => {
  const [filters, setFilters] = useState({
    location: '', category: '', bhk: '', maxPrice: ''
  });
  const [activeFilters, setActiveFilters] = useState({ ...filters });
  const [page, setPage] = useState(1);

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: '9',
    ...Object.fromEntries(Object.entries(activeFilters).filter(([_, v]) => v !== ''))
  });

  const { data, error, isLoading } = useSWR(`/properties?${queryParams.toString()}`, fetcher);

  const handleSearch = () => {
    setPage(1);
    setActiveFilters({ ...filters });
  };

  const properties = data?.properties || [];
  const totalPages = data?.pages || 1;

  return (
    <div className="min-h-screen bg-warm-white font-sans">
      <Helmet>
        <title>Premium Property Listings | Gupta Real Estate</title>
        <meta name="description" content="Find your dream home or commercial property with Gupta Real Estate. High quality, premium listings." />
        <meta property="og:title" content="Premium Property Listings | Gupta Real Estate" />
        <meta property="og:description" content="Find your dream home or commercial property with Gupta Real Estate. Browse our high quality, premium listings." />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-black text-navy tracking-tight leading-tight">Find your <span className="text-gold">perfect home</span> today</h1>
          <p className="text-slate-500 mt-4 text-lg">Browse our premium selection of residential and commercial properties.</p>
        </div>

        <FilterBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col h-full rounded-[2rem] border border-slate-100 p-2">
                <div className="aspect-[4/3] bg-slate-100 rounded-[1.8rem] mb-8"></div>
                <div className="px-6 space-y-4 pb-4">
                  <div className="h-6 bg-slate-100 rounded-full w-3/4"></div>
                  <div className="h-4 bg-slate-100 rounded-full w-1/2"></div>
                  <div className="pt-6 border-t border-slate-50 flex justify-between">
                    <div className="h-4 bg-slate-50 rounded-full w-1/4"></div>
                    <div className="h-4 bg-slate-50 rounded-full w-1/4"></div>
                  </div>
                  <div className="h-12 bg-slate-100 rounded-2xl w-full mt-6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
           <div className=" py-20 text-center">
             <div className="text-4xl mb-6">⚠️</div>
             <h3 className="text-xl font-black text-navy mb-2">Inventory Sync Interrupted</h3>
             <p className="text-slate-500 max-w-sm mx-auto">Systems are currently being optimized. Please check back in a few moments.</p>
           </div>
        ) : properties.length > 0 ? (
          <>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 auto-rows-fr">
              {properties.map((prop: any) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
            <Pagination page={page} pages={totalPages} setPage={setPage} />
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center border border-slate-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-black text-navy mb-2">No properties found</h3>
            <p className="text-slate-500 text-lg">Try adjusting your search criteria or clear your filters.</p>
            <button 
              onClick={() => { 
                const empty = {location:'', category:'', bhk:'', maxPrice:''};
                setFilters(empty); 
                setActiveFilters(empty);
                setPage(1); 
              }}
              className="mt-8 bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 px-6 py-3 rounded-xl transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PropertiesPage;

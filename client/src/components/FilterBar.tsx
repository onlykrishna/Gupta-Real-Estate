import React from 'react';

interface FilterBarProps {
  filters: any;
  setFilters: (f: any) => void;
  onSearch: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, onSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        
        <div className="lg:col-span-2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
          <input 
            type="text" 
            name="location"
            placeholder="Search city or neighborhood..."
            value={filters.location || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-slate-800 font-medium placeholder-slate-400"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
          <select 
            name="category"
            value={filters.category || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-slate-800 font-medium"
          >
            <option value="">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">BHK</label>
          <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-1 h-[46px] overflow-hidden">
             {['', '1', '2', '3', '4'].map(val => (
               <button
                  key={val}
                  onClick={() => setFilters({ ...filters, bhk: val })}
                  className={`flex-1 text-sm font-bold rounded-lg transition-colors ${filters.bhk === val ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 {val ? (val === '4' ? '4+' : val) : 'Any'}
               </button>
             ))}
          </div>
        </div>

        <button 
          onClick={onSearch}
          className="w-full h-[46px] bg-primary hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-primary/20 transition-all hover:shadow-lg active:scale-[0.98]"
        >
          Search Properties
        </button>

      </div>
    </div>
  );
};

export default FilterBar;

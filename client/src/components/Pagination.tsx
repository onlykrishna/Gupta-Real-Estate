import React from 'react';

interface PaginationProps {
  page: number;
  pages: number;
  setPage: (p: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, pages, setPage }) => {
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-12 pb-8">
      <button 
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-5 py-2.5 border border-slate-200 rounded-xl bg-white disabled:opacity-50 text-slate-700 hover:bg-slate-50 font-bold transition-all shadow-sm active:scale-95"
      >
        Prev
      </button>
      
      <div className="flex gap-2">
         {[...Array(pages)].map((_, i) => (
           <button
             key={i+1}
             onClick={() => setPage(i+1)}
             className={`w-10 h-10 rounded-xl font-bold transition-all flex items-center justify-center
                ${page === i+1 ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}
             `}
           >
             {i+1}
           </button>
         ))}
      </div>

      <button 
        onClick={() => setPage(Math.min(pages, page + 1))}
        disabled={page === pages}
        className="px-5 py-2.5 border border-slate-200 rounded-xl bg-white disabled:opacity-50 text-slate-700 hover:bg-slate-50 font-bold transition-all shadow-sm active:scale-95"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

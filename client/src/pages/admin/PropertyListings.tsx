import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axios';

const PropertyListings: React.FC = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const { data } = await axiosInstance.get('/properties?limit=100');
      setProperties(data.properties);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you absolutely sure you want to delete this property? This action is permanent.')) {
      try {
        await axiosInstance.delete(`/properties/${id}`);
        fetchProperties();
      } catch (err) {
        console.error('Delete failed', err);
        alert('Failed to delete property. Check console.');
      }
    }
  };

  return (
    <div className="animation-fade-in max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
         <div>
            <h1 className="text-2xl font-black text-slate-900">Manage Properties</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">Add, update, or remove property listings from the platform.</p>
         </div>
         <Link to="/admin/property/add" className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 font-bold rounded-xl transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95 text-sm flex items-center gap-2">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
           Add New Property
         </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-black uppercase text-xs tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-5">Title</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">BHK</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-800 mx-auto"></div></td></tr>
              ) : properties.map((prop: any) => (
                <tr key={prop._id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-5 font-bold text-slate-900 truncate max-w-[200px] md:max-w-xs">{prop.title}</td>
                  <td className="px-6 py-5 text-slate-600 font-bold">₹{prop.price.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-5 text-slate-600 capitalize font-medium">{prop.category}</td>
                  <td className="px-6 py-5 text-slate-600 font-bold">{prop.bhk}</td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-black tracking-widest ${prop.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {prop.isAvailable ? 'Available' : 'Sold'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right space-x-4 opacity-70 group-hover:opacity-100 transition-opacity">
                    <Link to={`/admin/property/edit/${prop._id}`} className="text-blue-600 font-bold hover:underline">Edit</Link>
                    <button onClick={() => handleDelete(prop._id)} className="text-red-600 font-bold hover:underline">Delete</button>
                    <Link to={`/properties/${prop._id}`} className="text-slate-500 font-bold hover:underline" target="_blank">View</Link>
                  </td>
                </tr>
              ))}
              {!loading && properties.length === 0 && (
                <tr>
                   <td colSpan={6} className="text-center py-12">
                     <div className="text-slate-400 font-medium text-lg mb-2">No properties constructed yet.</div>
                     <Link to="/admin/property/add" className="text-primary font-bold hover:underline">Create your first listing →</Link>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertyListings;

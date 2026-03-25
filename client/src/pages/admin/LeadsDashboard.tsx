import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';

const LeadsDashboard: React.FC = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/leads?status=${filter}&limit=50`);
      setLeads(data.leads);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [filter]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await axiosInstance.patch(`/leads/${id}`, { status: newStatus });
      fetchLeads(); // refresh visual data completely
    } catch (error) {
      console.error(error);
      alert('Failed to update status on server side.');
    }
  };

  const handleExport = () => {
    // Utilize Axios to naturally inherit HttpOnly cookies when hitting the export route
    axiosInstance.get('/leads/export', { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'leads_export.csv');
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      }).catch(err => alert('Failed to download CSV export. Please check server logs.'));
  };

  return (
    <div className="animation-fade-in max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
         <div>
            <h1 className="text-2xl font-black text-slate-900">Lead Inquiries</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">Manage property inquiries and prospect statuses.</p>
         </div>
         <button onClick={handleExport} className="bg-[#10b981] hover:bg-[#059669] text-white px-5 py-2.5 font-bold rounded-xl transition-all shadow-sm active:scale-95 text-sm flex items-center gap-2">
           ⬇ Export CSV Data
         </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Dynamic Nav Filters */}
        <div className="border-b border-slate-200 p-4 flex gap-2 overflow-x-auto bg-slate-50/50">
          {['all', 'new', 'contacted', 'closed'].map(f => (
            <button 
              key={f} 
              onClick={() => setFilter(f)} 
              className={`px-5 py-2 font-black tracking-wider text-xs uppercase rounded-lg transition-colors ${filter === f ? 'bg-slate-900 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-400 font-black uppercase text-xs tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5">Prospect Profile</th>
                <th className="px-6 py-5">Contact Vector</th>
                <th className="px-6 py-5">Property Target</th>
                <th className="px-6 py-5 text-center">Lifecycle Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-800 mx-auto"></div></td></tr>
              ) : leads.map((lead: any) => (
                <tr key={lead._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-5 text-slate-500 font-bold">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-black text-slate-900">{lead.name}</div>
                    <div className="text-xs text-slate-500 truncate mt-1 max-w-[250px] font-medium" title={lead.message}>"{lead.message}"</div>
                  </td>
                  <td className="px-6 py-5 text-sm">
                    <div className="font-bold text-slate-700">{lead.phone}</div>
                    <div className="text-slate-400 font-medium">{lead.email}</div>
                  </td>
                  <td className="px-6 py-5">
                    {lead.propertyId ? (
                      <a href={`/properties/${lead.propertyId._id}`} target="_blank" className="font-bold text-blue-600 hover:underline inline-block max-w-[200px] truncate">{lead.propertyId.title}</a>
                    ) : (
                      <span className="text-red-500 font-bold italic border border-red-200 bg-red-50 px-2 py-1 rounded text-xs">Prop Deleted</span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <select 
                      value={lead.status}
                      onChange={(e) => updateStatus(lead._id, e.target.value)}
                      className={`text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-2 outline-none cursor-pointer border-2 transition-all
                        ${lead.status === 'new' ? 'bg-blue-50 text-blue-700 border-blue-200 focus:border-blue-400' : ''}
                        ${lead.status === 'contacted' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 focus:border-yellow-400' : ''}
                        ${lead.status === 'closed' ? 'bg-green-50 text-[#059669] border-[#059669]/30 focus:border-[#059669]' : ''}
                      `}
                    >
                      <option value="new">🆕 New</option>
                      <option value="contacted">📞 Contacted</option>
                      <option value="closed">✅ Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
              {!loading && leads.length === 0 && (
                <tr><td colSpan={5} className="text-center py-16 text-slate-400 font-bold text-lg">No leads matched this view criteria.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadsDashboard;

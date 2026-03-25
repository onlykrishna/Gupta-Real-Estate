import React from 'react';

// Reusable stat card for the dashboard
const StatCard = ({ title, value, className = '' }: { title: string, value: string | number, className?: string }) => (
  <div className={`bg-white rounded-xl shadow-sm p-6 border border-slate-100 ${className}`}>
    <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">{title}</h3>
    <p className="text-3xl font-bold text-slate-900">{value}</p>
  </div>
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto animation-fade-in">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm mt-1">Metrics and summary of your real estate platform.</p>
      </div>
      
      {/* Top Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Listings" value={142} className="border-t-4 border-t-blue-500" />
        <StatCard title="Total Leads" value={8,391} className="border-t-4 border-t-green-500" />
        <StatCard title="New Leads (This Week)" value={156} className="border-t-4 border-t-purple-500" />
      </div>

      {/* Placeholder for deeper analytics/activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
          <div className="flex-1 flex items-center justify-center text-slate-400 bg-slate-50 rounded border border-dashed border-slate-200">
            Activity feed placeholder...
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Lead Conversion</h3>
          <div className="flex-1 flex items-center justify-center text-slate-400 bg-slate-50 rounded border border-dashed border-slate-200">
            Analytics chart placeholder...
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AdminDashboard;

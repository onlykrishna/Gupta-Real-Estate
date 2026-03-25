import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axios';

const PropertyForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '', price: '', bhk: '', area: '', 
    location: '', address: '', category: 'apartment', 
    description: '', virtualTourUrl: '', isAvailable: true
  });
  
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const fetchProp = async () => {
        try {
          const { data } = await axiosInstance.get(`/properties/${id}`);
          setFormData({
            title: data.title, price: data.price, bhk: data.bhk, area: data.area,
            location: data.location, address: data.address, category: data.category,
            description: data.description, virtualTourUrl: data.virtualTourUrl || '',
            isAvailable: data.isAvailable
          });
          setExistingImages(data.images || []);
        } catch (err) {
          setError('Failed to load property');
        }
      };
      fetchProp();
    }
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
      const urls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const removeExistingImage = (idxToRemove: number) => {
    setExistingImages(existingImages.filter((_, idx) => idx !== idxToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      submitData.append(key, val as string);
    });

    if (isEdit) {
      existingImages.forEach(img => submitData.append('existingImages', img));
    }

    if (files) {
      Array.from(files).forEach(file => {
        submitData.append('images', file);
      });
    }

    try {
      if (isEdit) {
        await axiosInstance.put(`/properties/${id}`, submitData, { headers: { 'Content-Type': 'multipart/form-data' }});
      } else {
        await axiosInstance.post('/properties', submitData, { headers: { 'Content-Type': 'multipart/form-data' }});
      }
      navigate('/admin/listings');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to save property. Verify inputs.');
    } finally {
      setLoading(false);
    }
  };

  const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';

  return (
    <div className="max-w-4xl mx-auto animation-fade-in">
      
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors">←</button>
        <div>
           <h2 className="text-3xl font-black text-slate-900">{isEdit ? 'Edit Property' : 'Publish New Property'}</h2>
           <p className="text-slate-500 font-medium text-sm mt-1">{isEdit ? 'Update the details and images below.' : 'Fill in the information to push to the live directory.'}</p>
        </div>
      </div>
      
      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-bold border border-red-200 shadow-sm">{error}</div>}

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Property Title</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none font-bold text-slate-900 transition-all placeholder-slate-400" placeholder="e.g. The Grand Penthouse at Koramangala" />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Category Type</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none font-bold text-slate-900 transition-all">
                <option value="apartment">Residential Apartment</option>
                <option value="villa">Luxury Villa</option>
                <option value="plot">Land Plot</option>
                <option value="commercial">Commercial Space</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Listed Price (₹)</label>
              <input type="number" min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none font-bold text-slate-900 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Total Bedrooms (BHK)</label>
              <input type="number" min="0" value={formData.bhk} onChange={e => setFormData({...formData, bhk: e.target.value})} required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none font-bold text-slate-900 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Super Built Area (sqft)</label>
              <input type="number" min="0" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none font-bold text-slate-900 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">General Location</label>
              <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none font-bold text-slate-900 transition-all" placeholder="e.g. South Delhi" />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Exact Street Address</label>
              <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none font-bold text-slate-900 transition-all" placeholder="For Maps API indexing..." />
            </div>
          </div>

          <div>
             <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Detailed Synopsis</label>
             <textarea rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none font-medium text-slate-700 transition-all resize-none" placeholder="Elaborate on the premium aspects of the property..."></textarea>
          </div>

          <div>
             <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Virtual Tour Embed URL (Optional)</label>
             <input type="url" value={formData.virtualTourUrl} onChange={e => setFormData({...formData, virtualTourUrl: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none font-medium text-slate-700 transition-all" placeholder="e.g. https://my.matterport.com/show/?m=xxx" />
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 border-dashed">
            <label className="block text-sm font-black text-slate-900 mb-4">Media Management (Max 10 images)</label>
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full text-sm font-medium text-slate-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-slate-900 file:text-white hover:file:bg-slate-800 transition-all cursor-pointer mb-6" />
            
            {(existingImages.length > 0 || previewUrls.length > 0) && (
              <div className="flex gap-3 overflow-x-auto pb-2 flex-wrap">
                {isEdit && existingImages.map((img, idx) => (
                   <div key={`exist-${idx}`} className="relative h-24 w-24 flex-shrink-0 group">
                     <img src={`${baseUrl}${img}`} className="w-full h-full object-cover rounded-xl shadow-sm border border-slate-200" />
                     <button type="button" onClick={() => removeExistingImage(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform z-10">×</button>
                   </div>
                ))}
                {previewUrls.map((url, idx) => (
                   <div key={`new-${idx}`} className="relative h-24 w-24 flex-shrink-0 group">
                      <span className="absolute top-0 w-full bg-blue-500/90 backdrop-blur text-white text-[9px] uppercase tracking-wider text-center font-bold z-10 py-0.5 rounded-t-xl">Draft</span>
                      <img src={url} className="w-full h-full object-cover rounded-xl shadow-sm border-2 border-blue-200" />
                   </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 w-fit">
            <input type="checkbox" id="isAvailable" checked={formData.isAvailable} onChange={e => setFormData({...formData, isAvailable: e.target.checked})} className="w-5 h-5 text-slate-900 bg-white border-slate-300 rounded focus:ring-slate-900 focus:ring-2 cursor-pointer" />
            <label htmlFor="isAvailable" className="font-bold text-slate-800 cursor-pointer select-none">Mark Property as Currently Available</label>
          </div>

          <div className="pt-6 border-t border-slate-100 flex gap-4">
            <button type="submit" disabled={loading} className="px-10 py-4 bg-slate-900 text-white font-black uppercase tracking-wider text-sm rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] disabled:opacity-50 transition-all active:scale-[0.98]">
               {loading ? 'Committing Changes...' : (isEdit ? 'Save Property' : 'Publish Property')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;

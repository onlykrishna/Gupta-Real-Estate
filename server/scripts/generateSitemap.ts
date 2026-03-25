import mongoose from 'mongoose';
import { Property } from '../src/models/Property';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') }); // specify explicit path to fix script running issues

const generateSitemap = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/guptarealestate';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for sitemap generation');
    
    const clientUrl = process.env.CLIENT_URL || 'https://guptarealestate.com';
    const properties = await Property.find({ isAvailable: true }).select('_id updatedAt');

    const urls = properties.map((prop: any) => `
  <url>
    <loc>${clientUrl}/properties/${prop._id}</loc>
    <lastmod>${new Date(prop.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${clientUrl}/properties</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>${urls}
</urlset>`;

    const dest = path.join(__dirname, '../../client/public/sitemap.xml');
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, sitemap);
    
    console.log('Sitemap built gracefully at /client/public/sitemap.xml');
    process.exit(0);
  } catch (error) {
    console.error('Failed to craft sitemap.xml:', error);
    process.exit(1);
  }
};

generateSitemap();

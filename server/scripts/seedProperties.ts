import mongoose from 'mongoose';
import { Property } from '../src/models/Property';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const properties = [
  {
    title: "The Celestia Penthouse",
    description: "Perched atop the city's most iconic skyline, The Celestia offers panoramic views that transcend the ordinary. This 5,500 sqft architectural marvel features floor-to-ceiling glass, a private infinity pool, and a bespoke automated climate system. Every detail, from the Italian marble flooring to the handcrafted teak cabinetry, has been curated for the ultimate luxury experience.",
    price: 125000000,
    bhk: 4,
    area: 5500,
    location: "South Delhi, India",
    address: "9th Floor, Sky Tower, Golf Links, New Delhi",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"],
    category: "residential",
    isAvailable: true,
    amenities: ["Infinity Pool", "Private Lift", "Smart Home", "24/7 Security", "Gym"]
  },
  {
    title: "Eco-Tech Corporate Plaza",
    description: "Designed for the futuristic enterprise, the Eco-Tech Corporate Plaza merges sustainable architecture with high-performance workspaces. LEED Platinum certified, it features vertical gardens, advanced air filtration, and flexible floor plans that adapt to your team's growth. Located in the heart of the financial district, it offers unparalleled connectivity and prestige.",
    price: 450000000,
    bhk: 0,
    area: 15200,
    location: "Gurgaon, India",
    address: "Sector 44, Cyber City, Gurgaon, Haryana",
    images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"],
    category: "commercial",
    isAvailable: true,
    amenities: ["Fiber Optic", "Parking for 50+", "Solar Power", "Cafeteria", "Board Rooms"]
  },
  {
    title: "The Heritage Villa",
    description: "Experience the timeless charm of colonial architecture blended with modern amenities. The Heritage Villa sits on 2 acres of manicured lawns, featuring vaulted ceilings, a wrap-around veranda, and a private wine cellar. Perfect for those who appreciate history without compromising on contemporary comfort.",
    price: 85000000,
    bhk: 5,
    area: 7200,
    location: "Jaipur, Rajasthan",
    address: "Plot 12, Civil Lines, Jaipur",
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"],
    category: "residential",
    isAvailable: true,
    amenities: ["Garden", "Servant Quarters", "Wine Cellar", "Swimming Pool"]
  },
  {
      title: "Zenith Heights Studio",
      description: "Compact luxury for the modern professional. This studio apartment maximizes space through innovative interior design and smart furniture. Located within walking distance of the city's top cultural and business hubs.",
      price: 15000000,
      bhk: 1,
      area: 850,
      location: "Mumbai, India",
      address: "Bandra West, Mumbai",
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"],
      category: "residential",
      isAvailable: true,
      amenities: ["Rooftop Garden", "Concierge", "High Speed Internet"]
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/guptarealestate';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding properties...');
    
    await Property.deleteMany({});
    console.log('Cleared existing properties.');
    
    await Property.insertMany(properties);
    console.log(`${properties.length} Premium properties seeded successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();

export const mockProperties = [
  {
    _id: "mock1",
    title: "The Celestia Penthouse (Demo Mode)",
    description: "Perched atop the city's most iconic skyline, The Celestia offers panoramic views that transcend the ordinary. This 5,500 sqft architectural marvel features floor-to-ceiling glass and a private infinity pool.",
    price: 125000000,
    bhk: 4,
    area: 5500,
    location: "South Delhi, India",
    address: "9th Floor, Sky Tower, Golf Links, New Delhi",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"],
    category: "residential",
    isAvailable: true,
    amenities: ["Infinity Pool", "Smart Home", "24/7 Security"]
  },
  {
    _id: "mock2",
    title: "Eco-Tech Corporate Plaza (Demo Mode)",
    description: "Designed for the futuristic enterprise, the Eco-Tech Corporate Plaza merges sustainable architecture with high-performance workspaces.",
    price: 450000000,
    bhk: 0,
    area: 15200,
    location: "Gurgaon, India",
    address: "Sector 44, Cyber City, Gurgaon, Haryana",
    images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"],
    category: "commercial",
    isAvailable: true,
    amenities: ["Fiber Optic", "Parking for 50+", "Solar Power"]
  }
];

export const mockAdmins = [
  {
    _id: "admin1",
    name: "Master Admin (Demo)",
    email: "admin@guptaestates.com",
    password: "password123" // In a real mock, this would be hashed
  }
];

import { Request, Response } from 'express';
import { Property } from '../models/Property';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { isMockMode } from '../db/connectDB';
import { mockProperties } from '../db/mockStore';

// @desc    Create a new property
// @route   POST /api/properties
// @access  Private/Admin
export const createProperty = async (req: Request, res: Response) => {
  if (isMockMode) return res.status(200).json({ _id: 'mock_creation', ...req.body });
  try {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const images: string[] = [];
    
    // Process files with Sharp directly from Memory WebP conversion pipeline
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files as Express.Multer.File[]) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${file.fieldname}-${uniqueSuffix}.webp`;
        const filepath = path.join(uploadDir, filename);
        
        await sharp(file.buffer)
          .webp({ quality: 80, effort: 6 })
          .toFile(filepath);
        
        images.push(`/uploads/${filename}`);
      }
    }

    const property = new Property({
      ...req.body,
      images
    });

    const savedProperty = await property.save();
    res.status(201).json(savedProperty);
  } catch (error: any) {
    console.error('Create Property Error:', error);
    res.status(500).json({ message: 'Server error processing save', error: error.message });
  }
};

// @desc    Fetch all properties w/ pagination & filters
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req: Request, res: Response) => {
  if (isMockMode) {
    return res.json({
      properties: mockProperties,
      page: 1,
      pages: 1,
      total: mockProperties.length
    });
  }

  try {
    const { bhk, minPrice, maxPrice, location, category, page = 1, limit = 10 } = req.query;
    let query: any = {};

    if (bhk) query.bhk = Number(bhk);
    if (category) query.category = category;
    if (location) query.location = { $regex: location, $options: 'i' };
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const pageCode = Number(page);
    const limitCode = Number(limit);
    const skip = (pageCode - 1) * limitCode;

    const properties = await Property.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitCode);

    const total = await Property.countDocuments(query);

    res.json({
      properties,
      page: pageCode,
      pages: Math.ceil(total / limitCode),
      total
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Fetch single property by ID
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req: Request, res: Response) => {
  if (isMockMode) {
     const prop = mockProperties.find(p => p._id === req.params.id) || mockProperties[0];
     return res.json(prop);
  }
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    
    res.json(property);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private/Admin
export const updateProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    let updatedData = { ...req.body };
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // Process fresh buffer images via Sharp WebP encoder
    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      const newImages: string[] = [];
      
      for (const file of req.files as Express.Multer.File[]) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${file.fieldname}-${uniqueSuffix}.webp`;
        const filepath = path.join(uploadDir, filename);
        
        await sharp(file.buffer)
          .webp({ quality: 80, effort: 6 })
          .toFile(filepath);
        
        newImages.push(`/uploads/${filename}`);
      }
      
      let existingImages = req.body.existingImages || [];
      if (!Array.isArray(existingImages)) {
        existingImages = [existingImages]; 
      }
      updatedData.images = [...existingImages, ...newImages];
    } else {
      updatedData.images = req.body.existingImages || [];
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    res.json(updatedProperty);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error updating property', error: error.message });
  }
};

// @desc    Delete a property (and corresponding files)
// @route   DELETE /api/properties/:id
// @access  Private/Admin
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    const rootDir = path.join(__dirname, '../../');
    for (const image of property.images) {
      const fullPath = path.join(rootDir, image);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property successfully deleted' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error deleting property', error: error.message });
  }
};

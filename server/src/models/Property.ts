import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  price: number;
  bhk: number;
  area: number;
  location: string;
  address: string;
  category: 'apartment' | 'villa' | 'plot' | 'commercial';
  images: string[];
  virtualTourUrl?: string;
  description: string;
  isAvailable: boolean;
  createdAt: Date;
}

const propertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    bhk: { type: Number, required: true },
    area: { type: Number, required: true }, // sqft
    location: { type: String, required: true },
    address: { type: String, required: true },
    category: {
      type: String,
      enum: ['apartment', 'villa', 'plot', 'commercial'],
      required: true,
    },
    images: { type: [String], default: [] },
    virtualTourUrl: { type: String },
    description: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Property = mongoose.model<IProperty>('Property', propertySchema);

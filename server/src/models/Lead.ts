import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  phone: string;
  email: string;
  message: string;
  propertyId: mongoose.Types.ObjectId;
  status: 'new' | 'contacted' | 'closed';
  createdAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export const Lead = mongoose.model<ILead>('Lead', leadSchema);

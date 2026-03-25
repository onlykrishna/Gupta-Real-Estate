import { Request, Response } from 'express';
import { Lead } from '../models/Lead';
import { Property } from '../models/Property';
import { sendAdminNotification } from '../utils/mailer';
import { Parser } from 'json2csv';
import { isMockMode } from '../db/connectDB';

const mockLeads = [
  {
    _id: "lead1",
    name: "Vikram Malhotra",
    phone: "+91 98110 500XX",
    email: "vikram@techsphere.com",
    message: "Interested in The Celestia Penthouse viewing this weekend.",
    propertyId: { title: "The Celestia Penthouse", location: "South Delhi" },
    status: "new",
    createdAt: new Date()
  },
  {
    _id: "lead2",
    name: "Anjali Sharma",
    phone: "+91 99001 223XX",
    email: "anjali@globalventures.com",
    message: "Need project feasibility report for Eco-Tech Corporate Plaza.",
    propertyId: { title: "Eco-Tech Corporate Plaza", location: "Gurgaon" },
    status: "contacted",
    createdAt: new Date(Date.now() - 86400000)
  }
];

// @desc    Submit a new property lead/inquiry
// @route   POST /api/leads
// @access  Public
export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, message, propertyId } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property targeted for lead was not found.' });
    }

    const newLead = new Lead({ name, phone, email, message, propertyId });
    const savedLead = await newLead.save();

    // Trigger email notification system asynchronously 
    sendAdminNotification(savedLead, property);

    res.status(201).json({ message: 'Inquiry successfully documented.', lead: savedLead });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error processing lead', error: error.message });
  }
};

// @desc    Update a lead's status phase
// @route   PATCH /api/leads/:id
// @access  Private/Admin
export const updateLeadStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!lead) return res.status(404).json({ message: 'Lead not found in database.' });
    
    res.json(lead);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error updating lead', error: error.message });
  }
};

// @desc    Fetch leads for Admin Dashboard with pagination/filters
// @route   GET /api/leads
// @access  Private/Admin
export const getLeads = async (req: Request, res: Response) => {
  if (isMockMode) {
    return res.json({
      leads: mockLeads,
      page: 1,
      pages: 1,
      total: mockLeads.length
    });
  }
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let query: any = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }

    const pageCode = Number(page);
    const limitCode = Number(limit);
    const skip = (pageCode - 1) * limitCode;

    const leads = await Lead.find(query)
      .populate('propertyId', 'title location price')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitCode);

    const total = await Lead.countDocuments(query);

    res.json({
      leads,
      page: pageCode,
      pages: Math.ceil(total / limitCode),
      total
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error retrieving leads', error: error.message });
  }
};

// @desc    Export all Lead Data strictly as CSV
// @route   GET /api/leads/export
// @access  Private/Admin
export const exportLeadsCsv = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.find()
      .populate('propertyId', 'title')
      .sort({ createdAt: -1 });
    
    const formattedData = leads.map((l: any) => ({
      Date: l.createdAt.toLocaleDateString(),
      Name: l.name,
      Phone: l.phone,
      Email: l.email,
      Property: l.propertyId ? l.propertyId.title : '[Property Deleted]',
      Message: l.message,
      Status: l.status.toUpperCase()
    }));

    const parser = new Parser();
    const csvContent = parser.parse(formattedData);

    res.header('Content-Type', 'text/csv');
    res.attachment('gupta_estates_leads_export.csv');
    return res.send(csvContent);
  } catch (error: any) {
    console.error('CSV Export Error:', error);
    res.status(500).json({ message: 'Server error during leads export process.', error: error.message });
  }
};

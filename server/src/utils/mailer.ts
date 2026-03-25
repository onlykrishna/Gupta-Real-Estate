import nodemailer from 'nodemailer';

export const sendAdminNotification = async (leadDetails: any, propertyInfo: any) => {
  try {
    // Note: In production, configure exact SMTP bindings from environment
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@guptarealestate.com';
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const propertyLink = `${clientUrl}/properties/${propertyInfo._id}`;

    const mailOptions = {
      from: `"Gupta Real Estate" <${process.env.SMTP_USER || 'noreply@guptarealestate.com'}>`,
      to: adminEmail,
      subject: `[New Lead] Inquiry for Property: ${propertyInfo.title}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #2563eb;">New Property Inquiry Received</h2>
          <p>A prospective client has submitted a new inquiry for <strong>${propertyInfo.title}</strong>.</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <h3 style="margin-bottom: 10px;">Contact Details</h3>
          <ul style="list-style: none; padding: 0; line-height: 1.6;">
            <li><strong>Name:</strong> ${leadDetails.name}</li>
            <li><strong>Email:</strong> ${leadDetails.email}</li>
            <li><strong>Phone:</strong> ${leadDetails.phone}</li>
          </ul>
          <h3 style="margin-top: 20px;">Client Message</h3>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; font-style: italic;">
            ${leadDetails.message}
          </div>
          <br />
          <div style="text-align: center; margin-top: 20px;">
            <a href="${propertyLink}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Review Listed Property
            </a>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Lead notification email dispatched: %s', info.messageId);
  } catch (error) {
    console.error('Failed to send admin notification email over SMTP:', error);
  }
};

const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    this.sender = process.env.SMTP_SENDER || '"JyotishDesk CRM" <no-reply@jyotishdesk.com>';
  }

  async sendFollowupReminder(clientEmail, clientName) {
    if (!clientEmail) {
      throw new Error('Client email is required to send a reminder.');
    }

    const mailOptions = {
      from: this.sender,
      to: clientEmail,
      subject: 'Follow-up Consultation Reminder',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p>Namaste <strong>${clientName}</strong>,</p>
          <p>We hope you are doing well.</p>
          <p>This is a reminder regarding your scheduled follow-up consultation.</p>
          <p>Please feel free to connect with your astrologer and share your progress or any concerns.</p>
          <br>
          <p>Best Regards,</p>
          <p><strong>JyotishDesk CRM</strong></p>
        </div>
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      console.error('Error sending follow-up reminder email:', error);
      throw error;
    }
  }

  async sendConsultationSummary(clientEmail, clientName, aiSummary) {
    if (!clientEmail) {
      throw new Error('Client email is required to send a consultation summary.');
    }

    const mailOptions = {
      from: this.sender,
      to: clientEmail,
      subject: 'Your Consultation Summary',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p>Namaste <strong>${clientName}</strong>,</p>
          <p>Thank you for attending your consultation.</p>
          <p>Below is a summary of your session:</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #8B5CF6; margin: 15px 0;">
            <p style="white-space: pre-wrap; margin: 0;">${aiSummary}</p>
          </div>
          <p>We wish you success and positivity ahead.</p>
          <br>
          <p>Best Regards,</p>
          <p><strong>JyotishDesk CRM</strong></p>
        </div>
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      console.error('Error sending consultation summary email:', error);
      throw error;
    }
  }
}

module.exports = new EmailService();

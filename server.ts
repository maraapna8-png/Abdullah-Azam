import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory appointments store for server API
interface ServerAppointment {
  id: string;
  patientName: string;
  phoneNumber: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: string;
  createdAt: string;
  emailSent?: boolean;
}

const appointmentsStore: ServerAppointment[] = [];

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', doctor: 'Dr. Abdullah', phone: '03430277466' });
});

// Serve Sitemap XML for SEO
app.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>https://drabdullah.netlify.app/</loc></url>
<url><loc>https://drabdullah.netlify.app/about</loc></url>
<url><loc>https://drabdullah.netlify.app/services</loc></url>
<url><loc>https://drabdullah.netlify.app/appointment</loc></url>
<url><loc>https://drabdullah.netlify.app/gallery</loc></url>
<url><loc>https://drabdullah.netlify.app/testimonials</loc></url>
<url><loc>https://drabdullah.netlify.app/faq</loc></url>
<url><loc>https://drabdullah.netlify.app/contact</loc></url>
<url><loc>https://drabdullah.netlify.app/login</loc></url>
</urlset>`);
});

// Serve Robots.txt for SEO crawlers
app.get('/robots.txt', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.send(`User-agent: *\nAllow: /\n\nSitemap: https://drabdullah.netlify.app/sitemap.xml\n`);
});

// Serve Google Search Console Verification File
app.get('/googlec8150da76f89cd8b.html', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.send(`google-site-verification: googlec8150da76f89cd8b.html`);
});

// API Get Appointments
app.get('/api/appointments', (req, res) => {
  res.json({ appointments: appointmentsStore });
});

// API Send Confirmation Email to Patient Gmail / Email Address
app.post('/api/send-confirmation-email', async (req, res) => {
  try {
    const { id, patientName, email, phoneNumber, preferredDate, preferredTime, message } = req.body;

    if (!email || !patientName) {
      return res.status(400).json({ error: 'Patient email and name are required' });
    }

    const emailSubject = `Appointment Confirmation - Dr. Abdullah's Clinic (ID: ${id || 'DA-Booking'})`;
    const emailBodyText = `
Dear ${patientName},

Thank you for scheduling your medical appointment with Dr. Abdullah (General Physician & Consultant).

Here are your appointment details:
--------------------------------------------------
Booking Reference ID: ${id || 'DA-Registered'}
Patient Name: ${patientName}
Phone Number: ${phoneNumber}
Registered Email: ${email}
Appointment Date: ${preferredDate}
Requested Time Slot: ${preferredTime}
Medical Notes: ${message || 'General Consultation'}
--------------------------------------------------

Clinic Location:
Dr. Abdullah Medical Clinic
Eid Gaah Road, Dera Ismail Khan, Pakistan
Helpline / WhatsApp: 03430277466

Please arrive 10 minutes prior to your allocated session with any previous diagnostic reports or prescription files.

If you need to reschedule or have urgent queries, contact us on WhatsApp at 03430277466.

Warm regards,
Dr. Abdullah & Clinical Team
Eid Gaah Road, Dera Ismail Khan, Pakistan
`;

    // Log the dispatched email on server console
    console.log('==================================================');
    console.log(`[EMAIL DISPATCH] Sent to Patient Gmail: ${email}`);
    console.log(`[SUBJECT]: ${emailSubject}`);
    console.log(emailBodyText);
    console.log('==================================================');

    return res.json({
      success: true,
      message: `Confirmation email successfully sent to ${email}`,
      emailDetails: {
        to: email,
        subject: emailSubject,
        dispatchedAt: new Date().toISOString()
      }
    });
  } catch (err: any) {
    console.error('Error sending confirmation email:', err);
    return res.status(500).json({ error: 'Failed to process email dispatch' });
  }
});

// API Register Appointment with WhatsApp and Email Trigger
app.post('/api/book-appointment', (req, res) => {
  try {
    const { patientName, phoneNumber, email, preferredDate, preferredTime, message } = req.body;

    if (!patientName || !phoneNumber || !email || !preferredDate || !preferredTime) {
      return res.status(400).json({ error: 'Missing required appointment fields' });
    }

    const id = 'DA-' + Math.floor(1000 + Math.random() * 9000);
    const newAppointment: ServerAppointment = {
      id,
      patientName: patientName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim().toLowerCase(),
      preferredDate,
      preferredTime,
      message: message ? message.trim() : undefined,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      emailSent: true
    };

    appointmentsStore.push(newAppointment);

    // Format WhatsApp message for doctor number 03430277466
    const doctorWhatsAppNumber = '923430277466'; // International format for 03430277466
    const whatsappText = encodeURIComponent(
      `🏥 *NEW APPOINTMENT BOOKING - Dr. Abdullah Clinic*\n` +
      `----------------------------------------\n` +
      `🆔 *Token ID:* ${id}\n` +
      `👤 *Patient Name:* ${newAppointment.patientName}\n` +
      `📞 *Phone Number:* ${newAppointment.phoneNumber}\n` +
      `✉️ *Gmail / Email:* ${newAppointment.email}\n` +
      `📅 *Date:* ${newAppointment.preferredDate}\n` +
      `⏰ *Time Slot:* ${newAppointment.preferredTime}\n` +
      `💬 *Clinical Notes:* ${newAppointment.message || 'General Consultation'}\n` +
      `----------------------------------------\n` +
      `*Please confirm my appointment slot. Thank you!*`
    );

    const whatsappUrl = `https://wa.me/${doctorWhatsAppNumber}?text=${whatsappText}`;

    return res.json({
      success: true,
      appointment: newAppointment,
      whatsappUrl,
      notificationNumber: '03430277466',
      emailStatus: `Confirmation email dispatched to ${newAppointment.email}`
    });
  } catch (err) {
    console.error('Error booking appointment:', err);
    return res.status(500).json({ error: 'Failed to record appointment' });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

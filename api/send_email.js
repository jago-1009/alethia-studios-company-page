  import { Resend } from 'resend';


    const resend = new Resend(process.env.RESEND_API_KEY);

    export default async function handler(req, res) {
      if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

      if (req.method === 'POST') {
        const { name,email,company,timeline,details } = req.body;
        const subject = `New Contact Form Submission from ${name}`;
        const body = `
          <h1>New Contact Form Submission</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Timeline:</strong> ${timeline}</p>
            <p><strong>Project Details:</strong> ${details}</p>
          `
        try {
          await resend.emails.send({
            from: 'Interest Form <noreply@alethiastudios.net>', 
            to: 'alethiastudiosllc@gmail.com',
            subject: subject,
            html: body,
          });
          res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ message: 'Error sending email.' });
        }
      } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    }
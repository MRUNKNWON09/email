const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  const { email, subject, message } = req.query;
  if (!email || !subject || !message) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject,
      text: message,
    });
    res.status(200).json({ success: true, message: "Email sent ✅" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

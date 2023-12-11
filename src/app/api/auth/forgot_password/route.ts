import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { username, clientKey } = req.query;

    const userExists = true; // Add your logic to check if the user exists

    if (userExists) {
      const verificationLink = `http://your-frontend-app/verify/${username}/${clientKey}`;
      const mailOptions = {
        from: "your-email@gmail.com",
        to: "user@example.com", // Replace with the user's email address
        subject: "Verify Your Email for Password Reset",
        html: `<p>Click the following link to verify your email: ${verificationLink}</p>`,
      };

      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: "Error sending verification email" });
        } else {
          console.log("Email sent: " + info.response);
          res.json({ message: "Verification email sent successfully" });
        }
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(405).end();
  }
}

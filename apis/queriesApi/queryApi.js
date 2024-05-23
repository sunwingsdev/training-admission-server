const express = require("express");
const nodeMailer = require("nodemailer");

const queriesApi = (queriesCollection) => {
  const queriesRouter = express.Router();

  //   add query
  queriesRouter.post("/", async (req, res) => {
    const queryData = req.body;

    let mailTransporter = nodeMailer.createTransport({
      service: "gmail",
      host: process.env.Nodemailer_Host,
      port: process.env.Nodemailer_Port,
      secure: true,
      auth: {
        user: process.env.Nodemailer_User,
        pass: process.env.Nodemailer_Pass,
      },
    });

    let mailContent = {
      from: queryData.email,
      to: process.env.Nodemailer_User,
      subject: queryData?.subject || "New Query",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="background-color: #4CAF50; color: white; padding: 10px 0; text-align: center; border-radius: 10px 10px 0 0;">New Query</h2>
          <div style="padding: 20px; background-color: #f9f9f9; border-radius: 0 0 10px 10px;">
            <p><strong>Name:</strong> ${queryData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${queryData.email}" style="color: #4CAF50;">${queryData.email}</a></p>
            <p><strong>Phone:</strong> ${queryData.phone}</p>
            <p><strong>Subject:</strong> ${queryData.subject}</p>
            <p><strong>Details:</strong></p>
            <p style="white-space: pre-wrap;">${queryData.details}</p>
          </div>
          <footer style="text-align: center; padding: 10px 0; color: #888; font-size: 12px;">
            This message was sent from your website contact form.
          </footer>
        </div>
      `,
    };

    mailTransporter.sendMail(mailContent, function (error, value) {
      if (error) {
        res
          .status(500)
          .json({ success: false, message: "Error sending message" });
      } else {
        res
          .status(200)
          .json({ success: true, message: "Message sent successfully" });
      }
    });
  });

  return queriesRouter;
};
module.exports = queriesApi;

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER || "enqueuethere@gmail.com";
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || "jwie eksx mpkr unpl").replace(/\s+/g, "");
const ADMIN_EMAIL = process.env.CONTACT_EMAIL || "enqueuethere@gmail.com";

// Create reusable Nodemailer transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const company = (body.company || "").trim();
    const service = (body.service || "").trim();
    const message = (body.message || "").trim();

    // Field validation
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Email, Mobile, Service, and Message)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeCompany = company ? escapeHtml(company) : "Not specified";
    const safeService = escapeHtml(service);
    const safeMessageHtml = escapeHtml(message).replace(/\n/g, "<br/>");
    const submittedTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    // 1. Email to Enqueue Team (Notification with all submission details)
    const adminMailOptions = {
      from: `"Enqueue Contact Form" <${GMAIL_USER}>`,
      to: ADMIN_EMAIL,
      replyTo: `"${name}" <${email}>`,
      subject: `[New Inquiry] ${name} — ${service}`,
      text: `New Contact Form Submission - Enqueue
----------------------------------------
Name: ${name}
Email: ${email}
Mobile: ${phone}
Company: ${company || "Not specified"}
Service: ${service}
Submitted At: ${submittedTime} (IST)

Message:
${message}
----------------------------------------
Reply directly to this email to contact ${name}.`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Inquiry</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #121212; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
          <div style="max-width: 600px; margin: 30px auto; background-color: #1a1a1a; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            
            <!-- Header -->
            <div style="background-color: #161616; padding: 28px 32px; border-bottom: 2px solid #42C8D6;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-family: monospace; font-size: 18px; font-weight: bold; letter-spacing: 0.15em; color: #42C8D6; text-transform: uppercase;">ENQUEUE</span>
                <span style="font-family: monospace; font-size: 11px; color: rgba(255,255,255,0.5); letter-spacing: 0.15em; text-transform: uppercase;">NEW LEAD NOTIFICATION</span>
              </div>
              <h2 style="font-size: 20px; font-weight: 600; margin: 16px 0 4px 0; color: #ffffff;">
                New Inquiry Received
              </h2>
              <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.4); font-family: monospace;">
                Submitted on ${submittedTime} (IST)
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-family: monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.45); width: 140px;">Full Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; font-weight: 500; color: #ffffff;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-family: monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.45);">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; color: #42C8D6;">
                    <a href="mailto:${safeEmail}" style="color: #42C8D6; text-decoration: none; font-weight: 500;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-family: monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.45);">Mobile Phone</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; color: #ffffff;">
                    <a href="tel:${safePhone}" style="color: #ffffff; text-decoration: none;">${safePhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-family: monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.45);">Company</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; color: #ffffff;">${safeCompany}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-family: monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.45);">Service</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px;">
                    <span style="display: inline-block; background-color: rgba(66, 200, 214,0.15); color: #42C8D6; border: 1px solid rgba(66, 200, 214,0.3); padding: 4px 10px; font-size: 12px; font-family: monospace; letter-spacing: 0.05em; border-radius: 4px;">
                      ${safeService}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Message Card -->
              <div style="margin-top: 24px;">
                <p style="font-family: monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin: 0 0 10px 0;">
                  Message Content
                </p>
                <div style="background-color: #242424; border-left: 3px solid #42C8D6; border-radius: 0 4px 4px 0; padding: 18px 20px; font-size: 14px; line-height: 1.6; color: #e0e0e0;">
                  ${safeMessageHtml}
                </div>
              </div>

              <!-- Action button -->
              <div style="margin-top: 32px; text-align: center;">
                <a href="mailto:${safeEmail}?subject=Re:%20Enqueue%20Inquiry%20-%20${encodeURIComponent(service)}"
                   style="display: inline-block; background-color: #42C8D6; color: #121212; font-weight: 700; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; padding: 12px 28px; text-decoration: none; border-radius: 4px;">
                  Reply to ${safeName}
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #141414; padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center;">
              <p style="margin: 0; font-family: monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.3);">
                Enqueue · Technology. Strategy. Execution.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 2. Email to the Sender (Confirmation & Success auto-reply)
    const userMailOptions = {
      from: `"Enqueue" <${GMAIL_USER}>`,
      to: email,
      replyTo: ADMIN_EMAIL,
      subject: `Thank you for contacting Enqueue, ${name}!`,
      text: `Hi ${name},

Thank you for reaching out to Enqueue! We have received your inquiry regarding "${service}".

Our team is reviewing your requirements and will get back to you within 24 hours.

Your Submission Details:
- Name: ${name}
- Mobile: ${phone}
${company ? `- Company: ${company}\n` : ""}- Service Requested: ${service}
- Message:
${message}

If you have urgent questions, you can reach us at:
Phone: +91 73054 29059
Email: ${ADMIN_EMAIL}

Best regards,
The Enqueue Team
https://enqueue.in
`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Thank You for Contacting Enqueue</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #121212; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
          <div style="max-width: 600px; margin: 30px auto; background-color: #1a1a1a; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            
            <!-- Header -->
            <div style="background-color: #161616; padding: 32px; border-bottom: 2px solid #42C8D6; text-align: center;">
              <div style="display: inline-block; font-family: monospace; font-size: 22px; font-weight: bold; letter-spacing: 0.2em; color: #42C8D6; text-transform: uppercase; margin-bottom: 8px;">
                ENQUEUE
              </div>
              <p style="margin: 0; font-family: monospace; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.4);">
                Technology · Strategy · Execution
              </p>
            </div>

            <!-- Body Content -->
            <div style="padding: 36px 32px;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(66, 200, 214,0.12); border: 1px solid #42C8D6; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                <span style="color: #42C8D6; font-size: 24px; line-height: 48px; text-align: center; display: block; width: 100%;">✓</span>
              </div>

              <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 16px 0; color: #ffffff;">
                We've received your message, ${safeName}!
              </h1>

              <p style="font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0 0 24px 0;">
                Thank you for reaching out to us. We appreciate your interest in partnering with Enqueue. Our team is currently reviewing your project details and requirements.
              </p>

              <div style="background: rgba(66, 200, 214,0.05); border: 1px solid rgba(66, 200, 214,0.25); border-radius: 6px; padding: 18px 20px; margin-bottom: 28px;">
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #42C8D6; font-weight: 500;">
                  ⚡ Quick Turnaround: You can expect a response from our engineering & strategy team within <strong>24 hours</strong>.
                </p>
              </div>

              <!-- Summary Section -->
              <div style="background-color: #222222; border-radius: 6px; padding: 22px; margin-bottom: 28px; border: 1px solid rgba(255,255,255,0.06);">
                <p style="font-family: monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin: 0 0 14px 0;">
                  Summary of your submission
                </p>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <tr>
                    <td style="padding: 6px 0; color: rgba(255,255,255,0.5); width: 130px;">Service:</td>
                    <td style="padding: 6px 0; color: #42C8D6; font-weight: 600;">${safeService}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: rgba(255,255,255,0.5);">Contact Mobile:</td>
                    <td style="padding: 6px 0; color: #ffffff;">${safePhone}</td>
                  </tr>
                  ${
                    company
                      ? `<tr>
                    <td style="padding: 6px 0; color: rgba(255,255,255,0.5);">Company:</td>
                    <td style="padding: 6px 0; color: #ffffff;">${safeCompany}</td>
                  </tr>`
                      : ""
                  }
                  <tr>
                    <td style="padding: 6px 0; color: rgba(255,255,255,0.5); vertical-align: top;">Your Message:</td>
                    <td style="padding: 6px 0; color: rgba(255,255,255,0.85); line-height: 1.5;">${safeMessageHtml}</td>
                  </tr>
                </table>
              </div>

              <!-- Direct Contact Box -->
              <p style="font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.7); margin: 0 0 10px 0;">
                Need to discuss something urgently or provide additional project files?
              </p>
              <p style="margin: 0; font-family: monospace; font-size: 13px; color: #ffffff;">
                Call us at <a href="tel:+917305429059" style="color: #42C8D6; text-decoration: none;">+91 73054 29059</a> or reply directly to this email (<a href="mailto:${ADMIN_EMAIL}" style="color: #42C8D6; text-decoration: none;">${ADMIN_EMAIL}</a>).
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #141414; padding: 24px 32px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #ffffff; font-weight: 500;">
                Enqueue Digital Solutions
              </p>
              <p style="margin: 0; font-family: monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.3);">
                Building high-impact technology & digital experiences
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both the admin notification email and the user confirmation email
    const [adminResult, userResult] = await Promise.allSettled([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    if (adminResult.status === "rejected") {
      console.error("Failed to send admin notification email:", adminResult.reason);
      return NextResponse.json(
        { error: "Failed to send notification email. Please try again or reach out directly to enqueuethere@gmail.com." },
        { status: 500 }
      );
    }

    if (userResult.status === "rejected") {
      console.warn("Failed to send user confirmation email:", userResult.reason);
      // Admin email succeeded, so we still return success to the user with a note
      return NextResponse.json({
        success: true,
        message: "Your message has been received! Our team will contact you within 24 hours.",
        userConfirmationSent: false,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully! A confirmation email has also been sent to your inbox.",
      userConfirmationSent: true,
    });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request. Please try again." },
      { status: 500 }
    );
  }
}

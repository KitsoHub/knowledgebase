import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
 
export async function POST(request) {
  try {
    const body = await request.json();
    const { itemId, category, feedBackType, message, userEmail } = body;
 
    // Extract values from nested objects if needed
    const categoryValue = category?.category || category;
    const feedbackTypeValue = feedBackType?.feedBackType || feedBackType;
 
    // Validate required fields
    if (!categoryValue || !feedbackTypeValue || !message || !userEmail) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
 
    // Initialize SMTP connection
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
 
    // EMAIL 1: Admin notification
    const adminMailOptions = {
      from: process.env.FROM_EMAIL,
      to: 'ogaufimokopakgosi3@gmail.com',
      subject: `Feedback: ${feedbackTypeValue} - ${categoryValue}`,
      text: `
Feedback Type: ${feedbackTypeValue}
Category: ${categoryValue}
Item ID: ${itemId}
User Email: ${userEmail}

Message:
${message}
      `,
      html: `
        <h2>New Feedback Received</h2>
        <p><strong>Feedback Type:</strong> ${feedbackTypeValue}</p>
        <p><strong>Category:</strong> ${categoryValue}</p>
        <p><strong>Item ID:</strong> ${itemId}</p>
        <p><strong>User Email:</strong> ${userEmail}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };
 
    // EMAIL 2: User confirmation - Slack style
    const userMailOptions = {
      from: process.env.FROM_EMAIL,
      to: userEmail,
      subject: 'Thank you for your feedback!',
      text: `
Hello from Folklore!

We hope you're having a lovely day.

We've received your feedback about our ${categoryValue}. Thank you for taking the time to help us improve!

Your feedback regarding: ${feedbackTypeValue}

"${message}"

We'll review your submission and get back to you if we need any clarification.

Thanks for your help!

Cheers,
The Folklore Team
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; background-color: #f8f8f8;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8f8f8;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          
          <!-- Logo/Icon -->
          <tr>
            <td style="padding: 40px 40px 30px 40px;">
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                📚
              </div>
            </td>
          </tr>
          
          <!-- Heading -->
          <tr>
            <td style="padding: 0 40px 20px 40px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #1d1c1d; line-height: 1.3;">
                Hello from Folklore!
              </h1>
            </td>
          </tr>
          
          <!-- Body Text -->
          <tr>
            <td style="padding: 0 40px 20px 40px;">
              <p style="margin: 0; font-size: 16px; color: #1d1c1d; line-height: 1.5;">
                We hope you're having a lovely day.
              </p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="margin: 0; font-size: 16px; color: #1d1c1d; line-height: 1.5;">
                We've received your feedback about our <strong>${categoryValue}</strong>. Thank you for taking the time to help us improve!
              </p>
            </td>
          </tr>
          
          <!-- Feedback Summary Box -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8f8f8; border-radius: 6px; border-left: 4px solid #3b82f6;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #616061; font-weight: 600;">
                      Feedback Type: ${feedbackTypeValue}
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #616061; line-height: 1.5; font-style: italic;">
                      "${message}"
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="margin: 0; font-size: 16px; color: #1d1c1d; line-height: 1.5;">
                We'll review your submission and get back to you if we need any clarification.
              </p>
            </td>
          </tr>
          
          <!-- Closing -->
          <tr>
            <td style="padding: 0 40px 20px 40px;">
              <p style="margin: 0; font-size: 16px; color: #1d1c1d; line-height: 1.5;">
                Thanks for your help!
              </p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <p style="margin: 0 0 5px 0; font-size: 16px; color: #1d1c1d; line-height: 1.5;">
                Cheers,
              </p>
              <p style="margin: 0; font-size: 16px; color: #1d1c1d; line-height: 1.5; font-weight: 600;">
                The Folklore Team
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; border-top: 1px solid #e8e8e8;">
              <p style="margin: 0; font-size: 13px; color: #616061; text-align: center; line-height: 1.5;">
                Made by <span style="font-weight: 600;">Folklore</span>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    };
 
    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);
 
    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error: error.message },
      { status: 500 }
    );
  }
}
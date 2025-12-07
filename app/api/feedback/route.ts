import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { AdminEmailTemplate, UserThankYouEmailTemplate } from '@/app/components/languages/folklore/feedback/Emailtemplates';

export async function POST(request) {
  try {
    const body = await request.json();
    const { itemId, category, feedBackType, message, userEmail } = body;
 
    const categoryValue = category?.category || category;
    const feedbackTypeValue = feedBackType?.feedBackType || feedBackType;
 
    if (!categoryValue || !feedbackTypeValue || !message || !userEmail) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
 
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
 
    // Generate HTML from template functions
    const adminHtml = AdminEmailTemplate({
      feedbackTypeValue,
      categoryValue,
      itemId,
      userEmail,
      message
    });

    const userHtml = UserThankYouEmailTemplate({
      categoryValue,
      feedbackTypeValue,
      message
    });
 
    const adminMailOptions = {
      from: process.env.FROM_EMAIL,
      to: 'ogaufimokopakgosi3@gmail.com',
      subject: `Feedback: ${feedbackTypeValue} - ${categoryValue}`,
      html: adminHtml,
    };
 
    const userMailOptions = {
      from: process.env.FROM_EMAIL,
      to: userEmail,
      subject: 'Thank you for your feedback!',
      html: userHtml,
    };
 
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
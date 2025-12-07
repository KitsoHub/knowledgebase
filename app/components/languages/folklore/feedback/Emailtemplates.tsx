// Email template functions that return HTML strings
// Save this as: app/components/emails/EmailTemplates.ts

export const AdminEmailTemplate = ({ 
  feedbackTypeValue, 
  categoryValue, 
  itemId, 
  userEmail, 
  message 
}: {
  feedbackTypeValue: string;
  categoryValue: string;
  itemId: string;
  userEmail: string;
  message: string;
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
    <div style="border-bottom: 3px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px;">
      <h1 style="color: #1f2937; font-size: 24px; font-weight: 700; margin: 0;">
        🔔 New Feedback Received
      </h1>
    </div>

    <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <div style="margin-bottom: 15px;">
        <span style="color: #6b7280; font-size: 14px; font-weight: 600; display: block; margin-bottom: 5px;">
          Feedback Type
        </span>
        <span style="color: #1f2937; font-size: 16px; font-weight: 500;">
          ${feedbackTypeValue}
        </span>
      </div>

      <div style="margin-bottom: 15px;">
        <span style="color: #6b7280; font-size: 14px; font-weight: 600; display: block; margin-bottom: 5px;">
          Category
        </span>
        <span style="color: #1f2937; font-size: 16px; font-weight: 500;">
          ${categoryValue}
        </span>
      </div>

      <div style="margin-bottom: 15px;">
        <span style="color: #6b7280; font-size: 14px; font-weight: 600; display: block; margin-bottom: 5px;">
          Item ID
        </span>
        <span style="color: #1f2937; font-size: 16px; font-weight: 500; font-family: monospace;">
          ${itemId}
        </span>
      </div>

      <div>
        <span style="color: #6b7280; font-size: 14px; font-weight: 600; display: block; margin-bottom: 5px;">
          User Email
        </span>
        <a href="mailto:${userEmail}" style="color: #3b82f6; font-size: 16px; font-weight: 500; text-decoration: none;">
          ${userEmail}
        </a>
      </div>
    </div>

    <div style="background-color: #fff7ed; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
      <h3 style="color: #92400e; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
        User's Message
      </h3>
      <p style="color: #78350f; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">
        ${message}
      </p>
    </div>

    <div style="background-color: #ecfdf5; padding: 15px; border-radius: 8px; text-align: center;">
      <p style="color: #047857; font-size: 14px; margin: 0; font-weight: 500;">
        ✅ This feedback has been saved to your database
      </p>
    </div>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        Folklore Admin Notification System
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

export const UserThankYouEmailTemplate = ({ 
  categoryValue, 
  feedbackTypeValue, 
  message 
}: {
  categoryValue: string;
  feedbackTypeValue: string;
  message: string;
}) => {
  return `
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
  `;
};
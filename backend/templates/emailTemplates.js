function emailVerificationTemp(otp) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Odio | OTP Verification</title>
    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f9fafb;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        overflow: hidden;
      }
      .header {
        background-color: #0f172a;
        color: #ffffff;
        text-align: center;
        padding: 20px 0;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 30px 20px;
        color: #111827;
      }
      .otp-box {
        text-align: center;
        font-size: 36px;
        font-weight: bold;
        background-color: #f3f4f6;
        padding: 15px;
        margin: 20px 0;
        border-radius: 8px;
        letter-spacing: 8px;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        color: #6b7280;
        padding: 20px;
        background-color: #f9fafb;
        border-top: 1px solid #e5e7eb;
      }
      a {
        color: #2563eb;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>ODIO Room</h1>
      </div>
      <div class="content">
        <p>Hi,</p>
        <p>We received a request to verify your email address for your Odio account.</p>
        <p>Please use the OTP below to complete the verification process:</p>

        <div class="otp-box">${otp}</div>

        <p>This OTP is valid for the next <strong>5 minutes</strong>. Do not share this code with anyone.</p>
        <p>If you did not request this, you can safely ignore this email.</p>

        <p>Warm regards,<br /><strong>The Odio Team</strong></p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Odio. All rights reserved.</p>
        <p>
          Need help? Contact us at
          <a href="mailto:support@odio.com">support@odio.com</a>
        </p>
      </div>
    </div>
  </body>
</html>
`;
}


export { emailVerificationTemp };
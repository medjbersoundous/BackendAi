import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

export const sendVerificationEmail = async (email, verificationToken) => {
    
  const verificationUrl = `${process.env.BACKEND_URL}/api/v1/auth/verify?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email',
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Welcome to RecovAi - Verify Your Email</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
            }
            .email-container {
                background-color: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #4a6fa5;
                color: white;
                padding: 25px;
                text-align: center;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .content {
                padding: 25px;
            }
            .welcome-text {
                font-size: 18px;
                margin-bottom: 20px;
                color: #2c3e50;
            }
            .btn {
                display: inline-block;
                background-color: #4a6fa5;
                color: white !important;
                text-decoration: none;
                padding: 12px 25px;
                border-radius: 6px;
                margin: 20px 0;
                font-weight: bold;
                transition: background-color 0.3s;
            }
            .btn:hover {
                background-color: #3a5a80;
            }
            .footer {
                text-align: center;
                padding: 15px;
                font-size: 12px;
                color: #7f8c8d;
                border-top: 1px solid #eee;
            }
            .highlight {
                color: #4a6fa5;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <div class="logo">RecovAi</div>
                <h2>Welcome to Our Community!</h2>
            </div>
            
            <div class="content">
                <p class="welcome-text">Thank you for signing up with <span class="highlight">RecovAi</span>! We're excited to have you on board.</p>
                
                <p>To complete your registration and start your recovery journey, please verify your email address by clicking the button below:</p>
                
                <div style="text-align: center;">
                    <a href="${verificationUrl}" class="btn">Verify My Email</a>
                </div>
            
                
                <p>This verification link will expire in 24 hours. If you didn't request this, please ignore this email.</p>
            </div>
            
            <div class="footer">
                <p>© ${new Date().getFullYear()} RecovAi. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Error sending email: ' + error.message);
  }
};

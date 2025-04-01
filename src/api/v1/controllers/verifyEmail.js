import Athlete from '../models/Athlete.js';

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const athlete = await Athlete.findOne({ verificationToken: token });
    const FRONT_URL = process.env.FRONT_URL
    if (!athlete) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Invalid Verification Link | RecovAi</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f5f7fa;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              color: #333;
            }
            .container {
              max-width: 500px;
              width: 90%;
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
              overflow: hidden;
              text-align: center;
            }
            .header {
              background-color: #ff6b6b;
              color: white;
              padding: 20px;
            }
            .content {
              padding: 30px;
            }
            h2 {
              margin-top: 0;
              color: #ff6b6b;
            }
            .btn {
              display: inline-block;
              background-color: #4a6fa5;
              color: white !important;
              text-decoration: none;
              padding: 12px 25px;
              border-radius: 6px;
              margin-top: 20px;
              font-weight: bold;
              transition: all 0.3s ease;
            }
            .btn:hover {
              background-color: #3a5a80;
              transform: translateY(-2px);
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
              color: white;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">RecovAi</div>
              <h2>Verification Failed</h2>
            </div>
            <div class="content">
              <p>The verification link is either invalid or has expired.</p>
              <p>Please request a new verification email from your account settings.</p>
              <a href="${FRONT_URL}/signup" class="btn">Return to SignUp Page</a>
            </div>
          </div>
        </body>
        </html>
      `);
    }

    athlete.verified = true;
    athlete.verificationToken = null;
    await athlete.save();

    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Email Verified | RecovAi</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: #333;
          }
          .container {
            max-width: 500px;
            width: 90%;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            text-align: center;
          }
          .header {
            background-color: #4a6fa5;
            color: white;
            padding: 20px;
          }
          .content {
            padding: 30px;
          }
          h2 {
            margin-top: 0;
            color: white;
          }
          .btn {
            display: inline-block;
            background-color: #4a6fa5;
            color: white !important;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 6px;
            margin-top: 20px;
            font-weight: bold;
            transition: all 0.3s ease;
          }
          .btn:hover {
            background-color: #3a5a80;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
            color: white;
          }
          .success-icon {
            font-size: 60px;
            color: #4a6fa5;
            margin: 20px 0;
          }
    
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">RecovAi</div>
            <h2 >Email Verified Successfully!</h2>
          </div>
          <div class="content">
            <div class="success-icon">✓</div>
            <p>Welcome to RecovAi, ${athlete.fullName || 'User'}!</p>
            <p>Your email has been successfully verified. You now have full access to your account.</p>
            <a href="${FRONT_URL}/login" class="btn">Continue to Login</a>
          </div>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Verification Error | RecovAi</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: #333;
          }
          .container {
            max-width: 500px;
            width: 90%;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            text-align: center;
          }
          .header {
            background-color: #ff6b6b;
            color: white;
            padding: 20px;
          }
          .content {
            padding: 30px;
          }
          h2 {
            margin-top: 0;
            color: #ff6b6b;
          }
          .btn {
            display: inline-block;
            background-color: #4a6fa5;
            color: white !important;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 6px;
            margin-top: 20px;
            font-weight: bold;
            transition: all 0.3s ease;
          }
          .btn:hover {
            background-color: #3a5a80;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">RecovAi</div>
            <h2>Verification Error</h2>
          </div>
          <div class="content">
            <p>We encountered an unexpected error while verifying your email.</p>
            <p>Our team has been notified. Please try again later.</p>
            <a href="${FRONT_URL}/" class="btn">Return to Homepage</a>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">If the problem persists, contact medjbersoundous@gmail.com</p>
          </div>
        </div>
      </body>
      </html>
    `);
  }
};
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendVerificationEmail = async (email, token, firstname) => {
  // FIXED: Remove /api/user/ - this should point to frontend route
  const verificationURL = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: `"AgroTech" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your email address - AgroTech',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2c3e50; margin-bottom: 10px;">AgroTech</h1>
          <div style="height: 3px; background: linear-gradient(90deg, #27ae60, #2ecc71); margin: 0 auto; width: 100px;"></div>
        </div>
        
        <h2 style="color: #27ae60; margin-bottom: 20px;">Hello ${firstname}, Welcome to AgroTech! 🌱</h2>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Thank you for joining our agricultural community! To get started and access all farming tools and resources, please verify your email address.
        </p>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
          Click the button below to verify your email:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationURL}" 
             style="background: linear-gradient(135deg, #27ae60, #2ecc71); 
                    color: white; 
                    padding: 15px 30px; 
                    text-decoration: none; 
                    border-radius: 5px; 
                    font-weight: bold; 
                    font-size: 16px; 
                    display: inline-block;
                    transition: all 0.3s ease;">
            Verify Email Address
          </a>
        </div>
        
        <p style="color: #777; font-size: 14px; line-height: 1.4; margin-bottom: 15px;">
          Or copy and paste this link into your browser:
        </p>
        
        <p style="color: #27ae60; font-size: 14px; word-break: break-all; background: #f8f9fa; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
          ${verificationURL}
        </p>
        
        <p style="color: #777; font-size: 14px; line-height: 1.4; margin-bottom: 20px;">
          If you didn't create an account with AgroTech, please ignore this email.
        </p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        
        <div style="text-align: center; color: #999; font-size: 12px;">
          <p>This email was sent by AgroTech</p>
          <p>© ${new Date().getFullYear()} AgroTech. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendResetPasswordEmail = async (email, token, firstname) => {
  // FIXED: This should also point to frontend route for password reset
  const resetURL = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"AgroTech" <${process.env.EMAIL_USER}>`, // FIXED: Use actual email
    to: email,
    subject: 'Reset your password - AgroTech',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2c3e50; margin-bottom: 10px;">AgroTech</h1>
          <div style="height: 3px; background: linear-gradient(90deg, #27ae60, #2ecc71); margin: 0 auto; width: 100px;"></div>
        </div>
        
        <h2 style="color: #34495e; margin-bottom: 20px;">Hello ${firstname} 👋</h2>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          We received a request to reset your password for your AgroTech account. 
          Don't worry, it happens to the best of us! 🔐
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetURL}" 
             style="background: linear-gradient(135deg, #27ae60, #2ecc71); 
                    color: white; 
                    padding: 15px 30px; 
                    text-decoration: none; 
                    border-radius: 5px; 
                    font-weight: bold; 
                    font-size: 16px; 
                    display: inline-block;">
            Reset Password
          </a>
        </div>
        
        <p style="color: #777; font-size: 14px; line-height: 1.4; margin-bottom: 15px;">
          Or copy and paste this link into your browser:
        </p>
        
        <p style="color: #27ae60; font-size: 14px; word-break: break-all; background: #f8f9fa; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
          ${resetURL}
        </p>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0;">
          <p style="color: #856404; font-size: 14px; margin: 0; font-weight: bold;">
            ⚠️ Important Security Notice:
          </p>
          <ul style="color: #856404; font-size: 14px; margin: 10px 0 0 20px;">
            <li>This link will expire in 1 hour for security reasons</li>
            <li>If you didn't request this password reset, please ignore this email</li>
            <li>Your password will not be changed until you click the link above</li>
          </ul>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        
        <div style="text-align: center; color: #999; font-size: 12px;">
          <p>This email was sent by AgroTech</p>
          <p>© ${new Date().getFullYear()} AgroTech. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendPasswordResetSuccessEmail = async (email, firstname) => {
  const mailOptions = {
    from: `"AgroTech" <${process.env.EMAIL_USER}>`, // FIXED: Use actual email
    to: email,
    subject: 'Password successfully reset - AgroTech',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2c3e50; margin-bottom: 10px;">AgroTech</h1>
          <div style="height: 3px; background: linear-gradient(90deg, #27ae60, #2ecc71); margin: 0 auto; width: 100px;"></div>
        </div>
        
        <h2 style="color: #27ae60; margin-bottom: 20px;">Password Reset Successful ✅</h2>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Hello ${firstname},
        </p>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Your password has been successfully reset. You can now log in to your AgroTech account with your new password.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL}/login" 
             style="background: linear-gradient(135deg, #27ae60, #2ecc71); 
                    color: white; 
                    padding: 15px 30px; 
                    text-decoration: none; 
                    border-radius: 5px; 
                    font-weight: bold; 
                    font-size: 16px; 
                    display: inline-block;">
            Login to Your Account
          </a>
        </div>
        
        <div style="background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px; padding: 15px; margin: 20px 0;">
          <p style="color: #721c24; font-size: 14px; margin: 0; font-weight: bold;">
            🔒 Security Notice:
          </p>
          <p style="color: #721c24; font-size: 14px; margin: 10px 0 0 0;">
            If you didn't reset your password, please contact our support team immediately at 
            <a href="mailto:support@agrotech.com" style="color: #721c24;">support@agrotech.com</a>
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        
        <div style="text-align: center; color: #999; font-size: 12px;">
          <p>This email was sent by AgroTech</p>
          <p>© ${new Date().getFullYear()} AgroTech. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
  sendPasswordResetSuccessEmail,
};
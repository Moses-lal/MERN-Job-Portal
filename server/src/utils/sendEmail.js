import nodemailer from "nodemailer";


const sendEmail = async (to, subject, message) => {
  console.log(to, subject, message);
  try {
    const Transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const EmailPacket = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: message,
    };

    const result = await Transporter.sendMail(EmailPacket);

    console.log("Email sent Successsfully", result.accepted);
    return true;
  } catch (error) {
    console.log("Error Sending Email", error);
    return false;
  }
};



export const sendForgetPasswordOTP = async (to, otp) => {
  try {
    const subject = "OTP for Password Reset";

    const message = `
            <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;">
                <!-- Preheader (hidden in email view but shows in inbox preview) -->
                <span style="display:none !important; visibility:hidden; mso-hide:all; font-size:1px; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">
                Use this OTP to verify your account. It expires in 5 minutes.
                </span>

                <!-- Outer wrapper -->
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f4f6f8;width:100%;min-width:320px;">
                <tr>
                    <td align="center" style="padding:24px 12px;">
                    <!-- Centered container -->
                    <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.08);">
                        <!-- Header -->
                        <tr>
                        <td style="padding:20px 24px 12px;text-align:left;">
                            <img src="https://example.com/logo.png" alt="Company Logo" width="120" style="display:block;border:0;outline:none;text-decoration:none;">
                        </td>
                        </tr>

                        <!-- Hero / Title -->
                        <tr>
                        <td style="padding:12px 24px 0;">
                            <h1 style="margin:0;font-size:20px;line-height:24px;color:#111827;font-weight:600;">Your verification code</h1>
                        </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                        <td style="padding:12px 24px 0;color:#6b7280;font-size:15px;line-height:22px;">
                            <p style="margin:0 0 12px 0;">Use the one-time passcode (OTP) below to verify your action. This code is valid for <strong style="color:#111827;">5 minutes</strong>.</p>
                        </td>
                        </tr>

                        <!-- OTP Box -->
                        <tr>
                        <td align="center" style="padding:12px 24px 18px;">
                            <table cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f9fafb;border:1px solid #e6e9ee;border-radius:8px;padding:18px 22px;display:inline-block;">
                            <tr>
                                <td style="text-align:center;">
                                <p style="margin:0 0 8px 0;color:#6b7280;font-size:13px;">One-time code</p>
                                <div style="font-size:28px;letter-spacing:4px;font-weight:700;color:#0f172a;">
                                    <!-- OTP placeholder -->
                                ${otp}
                                </div>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>

                        <!-- Tip / Safety -->
                        <tr>
                        <td style="padding:0 24px 18px;color:#6b7280;font-size:13px;line-height:20px;">
                            <p style="margin:0;">If you didn't request this code, you can ignore this email or <a href="mailto:contactus@yourcompany.com" style="color:#2563eb;text-decoration:none;">contact support</a>.</p>
                        </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                        <td style="padding:18px 24px 22px;border-top:1px solid #eef2f6;color:#9aa4b2;font-size:12px;line-height:18px;">
                            <p style="margin:0;">This email was sent by <strong>Your Company</strong> because you (or someone using your email) requested an OTP.</p>
                            <p style="margin:8px 0 0 0;">© <!-- year --> 2025 Your Company. All rights reserved.</p>
                        </td>
                        </tr>
                    </table>

                    </td>
                </tr>
                </table>
            </body>
        `;

    await sendEmail(to, subject, message);
    console.log("OTP sent Successsfully");
    return true;
  } catch (error) {
    console.log("Error Sending OTP", error);
    return false;
  }
};
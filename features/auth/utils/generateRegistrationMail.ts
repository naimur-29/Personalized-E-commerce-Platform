export default function generateRegistrationMail(
  name: string,
  link: string,
  supportEmail: string,
) {
  const mailSubject = "Verify Your Email for Personalized E-commerce Platform";
  const mailBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333;">

  <!-- Container -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td>
        <table role="presentation" width="600" cellspacing="0" cellpadding="20" style="background-color: #ffffff; margin: 0 auto; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="text-align: center; font-size: 24px; font-weight: bold; color: #333;">
              Personalized E-commerce Platform
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="font-size: 16px; line-height: 1.5; color: #333;">
              <p>Hi ${name},</p>
              <p>Thank you for registering with <strong>Personalized E-commerce Platform</strong>! We just need to verify your email address to complete your registration.</p>
              <p>Please click the link below to verify your email and activate your account:</p>
              <p style="text-align: center;">
                <a href="${link}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 5px;">Verify Your Email</a>
              </p>
              <p>If the link doesn't work, copy and paste the following URL into your browser:</p>
              <p><a href="${link}" style="color: #007bff;">${link}</a></p>
              <p>Once verified, you'll be able to log in and start exploring personalized product recommendations tailored just for you!</p>
              <p>If you didn't sign up for our platform, please ignore this email. No changes will be made to your account.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="font-size: 12px; color: #888; text-align: center;">
              <p>If you have any issues or questions, feel free to reach out to our support team at <a href="${supportEmail}" style="color: #007bff;">${supportEmail}</a>.</p>
              <p style="margin-top: 20px;">Thank you,<br>The Personalized E-commerce Platform Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

  return { mailSubject, mailBody };
}

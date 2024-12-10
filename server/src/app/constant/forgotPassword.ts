import { style } from "./styles";

export const forgotPasswordHTML = (userName: string, resetUrl: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verification</title>
    <style>
        ${style}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome, ${userName}!</h1>
        </div>
        <div class="content">
            <p>We're excited to have you join our community. To start your journey, please verify your email address by clicking the button below:</p>
            <a href="${resetUrl}"  target="_blank" class="cta-button">Verify Your Account</a>
            <p>If you did not create an account, no further action is required.</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} JOB HUNTER. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};

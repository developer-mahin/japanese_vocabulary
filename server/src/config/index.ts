import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    expires_in: process.env.EXPIRES_IN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_pass_secret: process.env.RESET_PASSWORD_TOKEN_SECRET,
    reset_pass_token_expires_in: process.env.RESET_PASSWORD_EXPIRES_IN,
  },
  admin: {
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASS,
  },
  front_end_url: process.env.FRONT_END_URL,
  reset_password_url: process.env.RESET_PASSWORD_LINK,
  smtp_email: process.env.SMTP_EMAIL,
  smtp_pass: process.env.SMTP_PASS,
};

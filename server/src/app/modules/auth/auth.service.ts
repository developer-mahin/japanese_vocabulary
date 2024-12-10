import * as bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { jwtHelpers } from "../../../Helpers/jwtHealpers";
import config from "../../../config";
import sendMail from "../../../shared/emailSender";
import AppError from "../../../shared/AppError";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    refreshToken,
    id: userData?.id,
    name: userData?.name,
    email: userData?.email,
    role: userData?.role,
    accessToken,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );
  } catch (err) {
    throw new Error("You are not authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
      id: userData.id,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

const changePassword = async (token: any, payload: any) => {
  const user = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret);

  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });
  const isCorrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Password is  Wrong");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);
  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
    },
  });
  return {
    message: "password changed Successfully",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  if (!userData) {
    throw new Error("User not found!");
  }

  const userInfo = {
    id: userData.id,
    email: userData.email,
    role: userData.role,
  };

  const token = jwtHelpers.generateToken(
    userInfo,
    config.jwt.reset_pass_secret as string,
    config.jwt.reset_pass_token_expires_in as string
  );

  const resetPasswordLink =
    config.reset_password_url + `?email=${userData.email}&token=${token}`;

  const html = `
    <div>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi,
          praesentium!
        </p>
      </div>
      <a href=${resetPasswordLink}>
        <button
          style="
            padding: 10px;
            border-radius: 7px;
            background-color: #0062ff;
            color: white;
            font-weight: 500;
            border: none;
          "
        >
          Reset Password
        </button>
      </a>
    </div>
    `;

  await sendMail(userData.email, html);
  return resetPasswordLink;
};

const resetPassword = async (
  token: string,
  payload: { email: string; password: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  if (!userData) {
    throw new Error("User not found!");
  }

  const isVerifyToken = jwtHelpers.verifyToken(
    token,
    config.jwt.reset_pass_secret as string
  );

  if (!isVerifyToken) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your are not authorized, Forbidden access"
    );
  }

  const hashPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.user.update({
    where: {
      email: payload.email,
    },
    data: {
      password: hashPassword,
    },
  });

  return result;
};
export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};

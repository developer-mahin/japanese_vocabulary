import * as bcrypt from "bcrypt";
import httpStatus from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { jwtHelpers } from "../../../Helpers/jwtHealpers";
import config from "../../../config";
import sendMail from "../../../shared/emailSender";
import AppError from "../../../shared/AppError";
import { TRegisterUser } from "./auth.interface";
import { verifyHtml } from "../../constant/verifyHTML";
import { forgotPasswordHTML } from "../../constant/forgotPassword";
import { Response } from "express";

const registerUser = async (payload: TRegisterUser) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  if (userData) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists!");
  }

  const token = jwtHelpers.generateToken(
    payload,
    config.jwt.jwt_secret as Secret,
    "5m"
  );

  try {
    const mailData = {
      email: payload.email,
      subject: "Account Activation Email",
      html: verifyHtml(payload.name, token, config.server_url as string),
    };

    await sendMail(mailData);
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "failed to send verification email"
    );
  }
};

const verifyUser = async (res: Response, token: string) => {
  const user = jwtHelpers.verifyToken(
    token,
    config.jwt.jwt_secret as Secret
  ) as JwtPayload;

  const { name, email, password, photo } = user;

  const isExistUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isExistUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "user already with this email address please try another email address"
    );
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password,
      photo,
    },
  });

  res.redirect(`${config.front_end_url}/login`);
};

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

  const mailData = {
    email: payload.email,
    subject: "Account Forgot Password Email",
    html: forgotPasswordHTML(userData?.name || "", resetPasswordLink),
  };

  await sendMail(mailData);
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
  registerUser,
  verifyUser,
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};

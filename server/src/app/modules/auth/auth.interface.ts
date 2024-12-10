export type TRegisterUser = {
  email: string;
  name: string;
  photo: string;
  password: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needPasswordChange: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};

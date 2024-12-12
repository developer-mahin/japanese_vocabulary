/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode } from "react";
import { USER_ROLE } from "../constants";

export type TSidebarItem = {
  title: string;
  path: string;
};

export type TSidebarMenus = {
  name: string;
  icon: ReactNode;
  path?: string;
  children?: TSidebarItem[];
};

export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type UserRole = keyof typeof USER_ROLE;

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export const Gender = ["MALE", "FEMALE"];
export type TPageHeader = {
  path: string;
  name: string;
};

export type TSelect = {
  key: string;
  value: string;
};

export type TAuthUser = {
  email: string;
  exp: number;
  iat: number;
  id: string;
  name: string;
  role: string;
};
export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};

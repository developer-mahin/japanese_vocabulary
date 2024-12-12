import { authKey } from "../constants";
import { TAuthUser } from "../types";
import { decodedToken } from "./jwt";

export const setToLocalStorage = (key: string, token: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.removeItem(key);
};

export const getUserFromLocalStorage = () => {
  const token = localStorage.getItem(authKey);
  if (!token) return null;
  const user = decodedToken(token || "") as TAuthUser;
  return { user, role: user.role };
};

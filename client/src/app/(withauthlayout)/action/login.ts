"use server";

import { BASE_URL } from "@/constants";
import setAccessToken from "@/services/setAccessToken";
import { FieldValues } from "react-hook-form";

export type TLoginProps = {
  email: string;
  password: string;
};

export const loginUser = async (
  payload: FieldValues,
  redirect?: string | undefined
) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  const data = await res.json();

  if (data.success && data?.data?.accessToken) {
    setAccessToken(data?.data?.accessToken, { redirect });
  }

  return data;
};

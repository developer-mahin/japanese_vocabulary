"use server";

import { BASE_URL } from "@/constants";
import { FieldValues } from "react-hook-form";

export type TLoginProps = {
  email: string;
};

export const resetPassword = async (payload: FieldValues, token: string) => {
  const res = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  const data = await res.json();

  return data;
};

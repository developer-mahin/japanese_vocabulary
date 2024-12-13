"use server";

import { BASE_URL } from "@/constants";
import { FieldValues } from "react-hook-form";

export type TLoginProps = {
  email: string;
};

export const forgotPassword = async (payload: FieldValues) => {
  const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return data;
};

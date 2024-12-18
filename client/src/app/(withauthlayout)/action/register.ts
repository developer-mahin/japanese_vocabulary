"use server";

import { BASE_URL } from "@/constants";
import { FieldValues } from "react-hook-form";

export const registerUser = async (payload: FieldValues) => {
  console.log(payload);

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return data;
};

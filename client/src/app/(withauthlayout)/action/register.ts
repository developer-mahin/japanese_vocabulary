"use server";

import { FieldValues } from "react-hook-form";

export const RegisterUser = async (payload: FieldValues) => {
  const res = await fetch(`http://localhost:5000/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return data;
};

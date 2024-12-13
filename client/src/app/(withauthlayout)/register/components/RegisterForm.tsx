/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import HRFileInput from "@/components/Form/HRFileInput";
import HRForm from "@/components/Form/HRForm";
import HRInput from "@/components/Form/HRInput";
import { BASE_URL } from "@/constants";
import { imageUploadIntoImgbb } from "@/utils/uploadImage";
import {
  registerDefaultValues,
  registerValidationSchema,
} from "@/Validations/loginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", data.picture);

    try {
      const profilePicture = await imageUploadIntoImgbb(formData);
      if (!profilePicture) {
        setLoading(false);
        return; // Stop further processing if the image upload failed
      }
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        photo: profilePicture,
      };

      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const response = await res.json();

      if (response.success) {
        toast.success("Please check your mail and verify your account!");
        setLoading(false);
      } else {
        toast.error(response?.message || "Registration failed!");
        setLoading(false);
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        "Account does not exist. Please register first!";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div>
      <HRForm
        onSubmit={handleRegister}
        resolver={zodResolver(registerValidationSchema)}
        defaultValues={registerDefaultValues}
      >
        <div className="mb-5">
          <HRInput
            label="Name"
            type="text"
            placeholder="Enter full name"
            name="name"
          />
        </div>
        <div className="mb-5">
          <HRInput
            label="Email Address"
            type="email"
            placeholder="Enter Email Address"
            name="email"
          />
        </div>
        <div className="pb-2">
          <HRInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter Password"
          />
        </div>
        <div className="pb-2">
          <HRFileInput label="Profile Picture" name="picture" className="" />
        </div>

        <div className="flex justify-end py-3">
          <Link
            href="/forgot-password"
            className="cursor-pointer text-sm text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <Button
          type="submit"
          fullWidth
          className={`font-semibold text-white rounded-none w-full ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
          }`}
          isDisabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </HRForm>
    </div>
  );
};

export default RegisterForm;

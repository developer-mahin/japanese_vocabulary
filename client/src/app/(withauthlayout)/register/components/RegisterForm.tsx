"use client";

import HRFileInput from "@/components/Form/HRFileInput";
import HRForm from "@/components/Form/HRForm";
import HRInput from "@/components/Form/HRInput";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister: SubmitHandler<FieldValues> = async (data) => {
    // try {
    //   const res = await registerUser(data);
    //   if (res?.data?.accessToken) {
    //     toast.success(res?.message || "Login successful!");
    //     storeUserInfo({ accessToken: res?.data?.accessToken });
    //     router.refresh();
    //   } else {
    //     toast.error("Invalid response from the server");
    //   }
    // } catch (err: any) {
    //   const errorMessage =
    //     err?.response?.data?.message ||
    //     "Account does not exist. Please register first!";
    //   toast.error(errorMessage);
    // } finally {
    //   setLoading(false);
    // }

    console.log(data);
  };

  return (
    <div>
      <HRForm onSubmit={handleRegister}>
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
          {loading ? "Logging in..." : "Sign In"}
        </Button>
      </HRForm>
    </div>
  );
};

export default RegisterForm;

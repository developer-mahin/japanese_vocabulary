"use client";

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
          <div>
            <HRInput
              type="email"
              placeholder="Enter Email Address"
              name="email"
              className="h-10 rounded-none border w-full px-4 outline-[#198754]  transition duration-200 outline-[1px]"
            />
          </div>
        </div>
        <div className="pb-2">
          <HRInput
            name="password"
            type="password"
            placeholder="Enter Password"
            className="h-10 rounded-none border w-full px-4 outline-[#198754]  transition duration-200 outline-[1px]"
          />
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

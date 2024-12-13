/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { loginUser } from "../../action/login";
import { toast } from "sonner";
import { resetPassword } from "../../action/resetPassword";
import { storeUserInfo } from "@/services/auth.services";

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const password = form.password.value;
    const data = { email, password };

    const res = await resetPassword(data, token as string);
    if (res?.success) {
      setLoading(false);
      const login = await loginUser(data);

      toast.success(login?.message || "Login successful!");
      storeUserInfo({ accessToken: login?.data?.accessToken });
      router.refresh();
    } else {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl text-center">Reset password</h2>
      <h2 className="text-center text-sm text-gray-400 my-2 pb-3">
        Reset password reset instruction
      </h2>

      <div className="mb-5 space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={email || ""}
          readOnly
          required
          className="h-10 rounded-none border w-full px-4 outline-[#198754]  transition duration-200 outline-[1px]"
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          required
          className="h-10 rounded-none border w-full px-4 outline-[#198754]  transition duration-200 outline-[1px]"
        />
      </div>

      <Button
        type="submit"
        fullWidth
        className={`font-semibold text-white rounded-none w-full ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
        }`}
        isDisabled={loading}
      >
        {loading ? "Sending..." : "Send password reset link"}
      </Button>
      <h2 className="text-center text-sm text-gray-400 mt-3 ">
        Remember Password{" "}
        <Link href="/login" className="text-black ms-2">
          Sign in
        </Link>
      </h2>
    </form>
  );
};

export default ResetPasswordForm;

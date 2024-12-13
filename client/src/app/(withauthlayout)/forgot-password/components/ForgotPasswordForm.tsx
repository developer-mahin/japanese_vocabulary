/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { forgotPassword } from "../../action/forgotPassword";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const data = { email };
    const res = await forgotPassword(data);

    if (res?.success) {
      setLoading(false);
      toast.success("Check email and reset your password")
    } else {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl text-center">Forgot password</h2>
      <h2 className="text-center text-sm text-gray-400 my-2 pb-3">
        Reset password reset instruction
      </h2>

      <div className="mb-5">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
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

export default ForgotPasswordForm;

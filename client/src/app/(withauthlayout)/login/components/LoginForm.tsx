/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import HRForm from "@/components/Form/HRForm";
import HRInput from "@/components/Form/HRInput";
import { storeUserInfo } from "@/services/auth.services";
import {
  loginDefaultValues,
  loginValidationSchema,
} from "@/Validations/loginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { loginUser } from "../../action/login";

const predefinedUsers = [
  {
    email: "admin@admin.com",
    password: "123456",
    role: "Admin",
  },
  {
    email: "user@user.com",
    password: "1234567",
    role: "User",
  },
];

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true);
      const res = await loginUser(data);

      console.log(res);

      if (res.success) {
        toast.success(res?.message || "Login successful!");
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.refresh();
        setLoading(false);
      } else {
        toast.error(res?.message || "Login failed!");
        setLoading(false);
      }
    } catch (err: any) {
      const errorMessage =
        err.message || "Account does not exist. Please register first!";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  const handleAutofill = (user: (typeof predefinedUsers)[0]) => {
    setEmail(user.email);
    setPassword(user.password);
  };

  return (
    <div>
      <HRForm
        onSubmit={handleLogin}
        resolver={zodResolver(loginValidationSchema)}
        defaultValues={loginDefaultValues}
      >
        <div className="mb-5">
          <div>
            <HRInput
              label="Email Address"
              type="email"
              placeholder="Enter Email Address"
              name="email"
              defaultValue={email}
            />
          </div>
        </div>
        <div className="pb-2">
          <HRInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter Password"
            defaultValue={password}
          />
        </div>
        <div className="mt-5">
          <table className="w-full border border-gray-200 bg-gray-50">
            <thead>
              <tr className="border-b ">
                <th className="p-2 border-r">Email</th>
                <th className="p-2 border-r">Password</th>
                <th className="p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {predefinedUsers.map((user, index) => (
                <tr
                  key={index}
                  className="cursor-pointer hover:bg-gray-100 text-sm text-center"
                  onClick={() => handleAutofill(user)}
                >
                  <td className="p-2 border-b border-r">{user.email}</td>
                  <td className="p-2 border-b border-r">{user.password}</td>
                  <td className="p-2 border-b ">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default LoginForm;

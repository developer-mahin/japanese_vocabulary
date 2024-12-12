import { Metadata } from "next";
import LoginForm from "./components/LoginForm";
import Image from "next/image";
import { assets } from "@/app/assets";
import style from "./login.module.css";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <div
      className={`${style.loginBg} flex items-center justify-center h-screen w-full bg-no-repeat bg-cover bg-unset bg-opacity-5`}
    >
      <div className="lg:w-[370px] w-full mx-4 lg:mx-auto py-7 px-8 border bg-white bg-opacity-75 rounded-[8px] shadow-lg">
        <div className="mb-5 ">
          <div className="flex items-center justify-center">
            <Image
              src={assets.images.logo}
              alt=""
              width={500}
              height={500}
              className="size-20 rounded-full object-contain border"
            />
          </div>

          <div className="text-center mt-3">
            <p className="font-semibold text-2xl">HR Nexus Login</p>
            <p className="font-medium text-lg">Welcome Back, HR Nexus</p>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

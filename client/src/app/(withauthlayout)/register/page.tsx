import Image from "next/image";
import style from "../login/login.module.css";
import { assets } from "@/assets";
import RegisterForm from "./components/RegisterForm";
import { Divider } from "@nextui-org/react";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div
      className={`${style.loginBg} flex items-center justify-center h-screen w-full bg-no-repeat bg-cover bg-unset bg-opacity-5`}
    >
      <div className="lg:w-[450px] w-full mx-4 lg:mx-auto py-7 px-8 border bg-white bg-opacity-75 rounded-[8px] shadow-lg">
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
            <p className="font-semibold text-2xl">Register Page</p>
            <p className="font-medium text-lg">
              Welcome Back, Japanese Vocabulary
            </p>
          </div>
        </div>
        <RegisterForm />

        <div className="my-4">
          <Divider />
          <p className=" mt-2 text-center">
            If already have an account, please{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

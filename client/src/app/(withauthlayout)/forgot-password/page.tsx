import style from "../login/login.module.css";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div
      className={`${style.loginBg} flex items-center justify-center h-screen w-full bg-no-repeat bg-cover bg-unset bg-opacity-5`}
    >
      <div className="lg:w-[450px] w-full mt-20 p-8 bg-white rounded-xl shadow-sm border">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
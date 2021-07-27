import React, { useState } from "react";
import { GiAxeSwing } from "react-icons/gi";
import LoginForm from "../components/landing/loginForm";
import RegisterForm from "../components/landing/registerForm";

function Login() {
  const [pageIndex, setPageIndex] = useState(0);

  const isActive = (index) => {
    if (index === pageIndex) {
      return "w-2/5 text-white border-b border-custom-button-primary py-2";
    }
    return "w-2/5 py-2";
  };

  return (
    <div className="flex flex-col items-center bg-custom-bg-main h-screen text-white">
      <div className="flex flex-col w-1/4 mt-12">
        <div className="self-center">
          <GiAxeSwing size={36} />
        </div>
        <div className="flex my-10 mx-10">
          <img src="/assets/landing/holo_title.svg"/>
        </div>
      </div>

      <div className="flex flex-col w-96 p-10 bg-black bg-opacity-25 rounded-xl items-center text-custom-misc-inactive">
        <div className="flex w-full justify-around mb-8 text-lg font-semibold text-center">
          <span className={isActive(0)} onClick={() => setPageIndex(0)}>
            Login
          </span>
          <span className={isActive(1)} onClick={() => setPageIndex(1)}>
            Register
          </span>
        </div>
        {pageIndex === 0 ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

export default Login;

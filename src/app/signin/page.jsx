import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import LoginForm from "@/components/login-form";
import "./index.css";
import "./mobile.css";

export default function Login() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Animation Container */}
      <div className="absolute inset-0 w-full h-full">
        <BackgroundGradientAnimation />
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import LoginForm from "@/components/signin-form";
import "./index.css";
import "./mobile.css";

export default function Login() {
  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Background Animation Container (immer angezeigt) */}
      <div className="absolute inset-0 w-full min-h-screen pointer-events-none">
        <BackgroundGradientAnimation height="calc(100vh + 10rem)" />
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 w-full flex items-center justify-center py-6 min-h-screen">
        <LoginForm />
      </div>
    </div>
  );
}

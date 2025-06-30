"use client";
import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import SignupForm from "@/components/signup-form";
import "./index.css";
import "./mobile.css";

export default function Register() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Animation Container */}
      <div className="absolute inset-0 w-full h-full">
        <BackgroundGradientAnimation />
      </div>

      {/* Register Form Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <SignupForm />
      </div>
    </div>
  );
}

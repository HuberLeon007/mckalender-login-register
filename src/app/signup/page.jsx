"use client";
import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import SignupForm from "@/components/signup-form";
import "./index.css";
import "./mobile.css";

export default function Register() {
  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Background Animation Container (einmal, mit extra Höhe) */}
      <div className="absolute inset-0 w-full min-h-screen pointer-events-none">
        <BackgroundGradientAnimation height="calc(100vh + 10rem)" />
      </div>

      {/* Register Form Container */}
      <div className="relative z-10 w-full flex items-center justify-center py-6 min-h-screen">
        <SignupForm />
      </div>
    </div>
  );
}

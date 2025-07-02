"use client";
import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import SignupForm from "@/components/signup-form";
import "./index.css";
import "./mobile.css";

export default function Register() {
  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Background Animation Container (immer angezeigt) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ minHeight: "100vh" }}
      >
        <BackgroundGradientAnimation height="100%" />
      </div>

      {/* Register Form Container */}
      <div className="relative z-10 w-full flex items-center justify-center py-6 min-h-screen">
        <SignupForm />
      </div>
    </div>
  );
}

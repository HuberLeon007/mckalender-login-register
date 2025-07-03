"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import VerifyCodeForm from "@/components/ui/verify-code-form";
import "../signup/index.css";
import "../signup/mobile.css";

export default function VerificationForm() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "";
  return (
    <div className="relative w-full min-h-screen bg-black">
      <div className="absolute inset-0 w-full min-h-screen pointer-events-none">
        <BackgroundGradientAnimation height="calc(100vh + 10rem)" />
      </div>
      <div className="relative z-10 w-full flex items-center justify-center py-6 min-h-screen">
        <VerifyCodeForm
          username={username}
          verifyEmailMock={(username, code) => {
            console.log("Verify called:", { username, code });
            return Promise.resolve({ success: true });
          }}
          resendVerificationCodeMock={username => {
            console.log("Resend code called:", { username });
            return Promise.resolve({ success: true });
          }}
        />
      </div>
    </div>
  );
}

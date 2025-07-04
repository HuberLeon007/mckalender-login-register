"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import VerifyCodeForm from "@/components/ui/verify-code-form";

function VerificationContent() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "";

  return (
    <VerifyCodeForm
      username={username}
    />
  );
}

export default function VerificationForm() {
  return (
    <div className="relative w-full min-h-screen bg-black">
      <div className="absolute inset-0 w-full min-h-screen pointer-events-none">
        <BackgroundGradientAnimation height="calc(100vh + 10rem)" />
      </div>
      <div className="relative z-10 w-full flex items-center justify-center py-6 min-h-screen">
        <Suspense fallback={<div>Loading...</div>}>
          <VerificationContent />
        </Suspense>
      </div>
    </div>
  );
}

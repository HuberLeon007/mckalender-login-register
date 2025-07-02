"use client";

import React, { useEffect, useState } from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import LoginForm from "@/components/signin-form";
import "./index.css";
import "./mobile.css";

export default function Login() {
  const [showAnimation, setShowAnimation] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 1920 && window.innerHeight <= 1080) {
      setShowAnimation(true);
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Background Animation Container (einmal, mit extra Höhe) */}
      <div className="absolute inset-0 w-full min-h-screen pointer-events-none">
        {showAnimation ? (
          <BackgroundGradientAnimation height="calc(100vh + 10rem)" />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(40deg, rgb(15,23,42), rgb(30,41,59))",
            }}
          />
        )}
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 w-full flex items-center justify-center py-6 min-h-screen">
        <LoginForm />
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import SignupForm from "@/components/signup-form";
import "./index.css";
import "./mobile.css";

export default function Register() {
  const [showAnimation, setShowAnimation] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 1920 && window.innerHeight <= 1080) {
      setShowAnimation(true);
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Background Animation Container (wächst mit dem Inhalt) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: '100vh' }}>
        {showAnimation ? (
          <BackgroundGradientAnimation height="100%" />
        ) : (
          <div
            className="w-full h-full absolute inset-0"
            style={{
              background:
                "linear-gradient(40deg, rgb(15,23,42), rgb(30,41,59))",
              minHeight: '100vh'
            }}
          />
        )}
      </div>

      {/* Register Form Container */}
      <div className="relative z-10 w-full flex items-center justify-center py-6 min-h-screen">
        <SignupForm />
      </div>
    </div>
  );
}

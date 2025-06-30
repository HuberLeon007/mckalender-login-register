"use client";
import { useEffect, useState } from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 1920 && window.innerHeight <= 1080) {
      setShowAnimation(true);
    }
  }, []);

  return (
    <>
      {showAnimation ? (
        <BackgroundGradientAnimation />
      ) : (
        <div className="w-full h-screen min-h-screen" style={{background: "linear-gradient(40deg, rgb(15,23,42), rgb(30,41,59))"}} />
      )}
    </>
  );
}

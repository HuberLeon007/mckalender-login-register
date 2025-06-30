"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandFacebook
} from "@tabler/icons-react";
import "./morphgism-styles.css";

export default function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted");
  };

  return (
    <div className="w-full max-w-lg xl:max-w-xl">
      {/* Main Card with Apple Morphgism Style */}
      <div className="rounded-3xl morphgism-card">
        <div className="w-full h-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl sm:text-5xl text-white font-bold tracking-tight mb-2 modern-title">
              Sign In
            </h1>
            <p className="text-lg text-white text-opacity-90 leading-relaxed modern-subtitle">
              Welcome back, you've been missed.
            </p>
          </div>

          {/* Content Wrapper with Glassmorphism */}
          <div className="content-wrapper rounded-2xl">
            <form onSubmit={handleSubmit}>
              {/* Social Login Buttons */}
              <div className="flex flex-col social-buttons-container">
                <button 
                  type="button"
                  className="social-btn flex items-center justify-center gap-4 rounded-xl">
                  <IconBrandGoogle className="w-5 h-5" />
                  <span className="text-lg font-medium text-white">
                    Google
                  </span>
                </button>
                <button 
                  type="button"
                  className="social-btn flex items-center justify-center gap-4 rounded-xl">
                  <IconBrandFacebook className="w-5 h-5" />
                  <span className="text-lg font-medium text-white">
                    Facebook
                  </span>
                </button>
              </div>

              {/* OR Divider */}
              <div className="flex items-center or-divider">
                <div className="flex-1 h-px bg-white bg-opacity-30"></div>
                <span className="text-lg text-white text-opacity-80 or-text">
                  OR
                </span>
                <div className="flex-1 h-px bg-white bg-opacity-30"></div>
              </div>

              {/* Email Input */}
              <div className="input-group">
                <Label className="block text-lg text-white text-opacity-90 input-label">
                  Email Address
                </Label>
                <Input 
                  type="email" 
                  placeholder="your@email.com"
                  className="aceternity-input w-full rounded-xl text-lg"
                />
              </div>

              {/* Password Input */}
              <div className="input-group">
                <Label className="block text-lg text-white text-opacity-90 input-label">
                  Password
                </Label>
                <Input 
                  type="password" 
                  placeholder="••••••••"
                  className="aceternity-input w-full rounded-xl text-lg"
                />
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-end remember-forgot-container">
                <a
                  href="#"
                  className="text-lg text-white hover:text-white transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button 
                type="submit"
                className="login-btn w-full rounded-xl">
                <span className="text-xl font-semibold text-white">
                  Sign in →
                </span>
              </button>
            </form>
          </div>

          {/* Create Account Link */}
          <div className="text-center create-account-container">
            <span className="text-lg text-white text-opacity-80">
              Don't have an account?{" "}
            </span>
            <a
              href="/register"
              className="text-lg text-white font-semibold hover:text-white transition-colors">
              Create New Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

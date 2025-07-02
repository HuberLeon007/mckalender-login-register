"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGoogle,
  IconBrandFacebook,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import { loginUser, getBaseUrl } from "@/lib/auth";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import VerificationForm from "./verification-form";
import "./input.css";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationUsername, setVerificationUsername] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    const result = await loginUser(formData.username, formData.password);

    if (result.success) {
      // Successful login
      window.location.href = `${getBaseUrl()}/web/cookies`;
    } else if (result.needsVerification) {
      // Email verification required
      setVerificationUsername(formData.username);
      setShowVerification(true);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const handleGoogleAuth = async () => {
    // This will be handled by Google OAuth integration
    // For now, redirect to Google auth endpoint
    window.location.href = "/auth/google/login";
  };

  const handleVerificationSuccess = () => {
    setShowVerification(false);
    setVerificationUsername("");
    setFormData({ username: "", password: "" });
  };

  const handleBackToLogin = () => {
    setShowVerification(false);
    setVerificationUsername("");
  };

  if (showVerification) {
    return (
      <VerificationForm
        username={verificationUsername}
        onVerificationSuccess={handleVerificationSuccess}
        onBackToLogin={handleBackToLogin}
      />
    );
  }

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
      {/* Main Card with Apple Morphgism Style */}
      <div className="rounded-2xl morphgism-card p-3 flex flex-col">
        <div className="w-full h-auto flex-1 flex flex-col">
          {/* Header */}
          <div className="text-center mb-4">
            <h1
              className="text-2xl sm:text-3xl text-black font-bold tracking-tight mb-1 modern-title"
              style={{ color: "#111" }}
            >
              Sign In
            </h1>
            <p
              className="text-sm text-black text-opacity-75 leading-relaxed modern-subtitle"
              style={{ color: "#222" }}
            >
              Welcome back, you've been missed.
            </p>
          </div>

          {/* Fehler-Alert */}
          {error && (
            <div className="bg-red-500 bg-opacity-80 text-white text-sm rounded-lg px-3 py-2 mb-2 text-center">
              {error}
            </div>
          )}

          {/* Content Wrapper */}
          <div className="content-wrapper rounded-xl p-2 flex-1 overflow-y-visible">
            <form onSubmit={handleSubmit} className="flex flex-col min-h-0">
              {/* Social Login Buttons */}
              <div className="flex flex-col social-buttons-container gap-2 mb-2">
                <button
                  type="button"
                  className="social-btn flex items-center justify-center gap-2 rounded-lg text-base py-2"
                  onClick={handleGoogleAuth}
                >
                  <IconBrandGoogle className="w-4 h-4" />
                  <span className="font-medium text-black">Google</span>
                </button>
                <button
                  type="button"
                  className="social-btn flex items-center justify-center gap-2 rounded-lg text-base py-2"
                  onClick={() => (window.location.href = "/auth/facebook")}
                >
                  <IconBrandFacebook className="w-4 h-4" />
                  <span className="font-medium text-black">Facebook</span>
                </button>
              </div>

              {/* OR Divider */}
              <div className="flex items-center or-divider mb-2">
                <div className="flex-1 h-px bg-black bg-opacity-30"></div>
                <span className="text-base text-black text-opacity-80 or-text px-2">
                  OR
                </span>
                <div className="flex-1 h-px bg-black bg-opacity-30"></div>
              </div>

              {/* Email Input */}
              <div className="input-group mb-2">
                <Label className="block text-base text-black text-opacity-80 input-label">
                  Username or Email
                </Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="your@email.com or username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="aceternity-input w-full rounded-lg text-base"
                />
              </div>

              {/* Password Input */}
              <div className="input-group mb-2 relative">
                <Label className="block text-base text-black text-opacity-80 input-label">
                  Password
                </Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="aceternity-input w-full rounded-lg text-base pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 flex items-center justify-center"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <IconEyeOff className="w-5 h-5 opacity-70" />
                  ) : (
                    <IconEye className="w-5 h-5 opacity-70" />
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-end remember-forgot-container mb-2">
                <a href="#" className="text-sm text-black">
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="login-btn w-full rounded-lg py-2 disabled:opacity-50"
              >
                <span className="text-base font-semibold text-black">
                  {isLoading ? "Signing in..." : "Sign in →"}
                </span>
              </button>
            </form>
          </div>

          {/* Create Account Link */}
          <div className="text-center create-account-container mt-2">
            <span className="text-base text-black text-opacity-70">
              Don't have an account?{" "}
            </span>
            <a
              href="/auth/signup"
              className="text-base text-black font-semibold"
            >
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

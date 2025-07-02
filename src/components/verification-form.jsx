"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { verifyEmail, resendVerificationCode } from "@/lib/auth";

export default function VerificationForm({ username, onVerificationSuccess, onBackToLogin }) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleVerificationCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setVerificationCode(value.slice(0, 6)); // Limit to 6 digits
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      setError("Please enter a 6-digit verification code.");
      return;
    }

    setIsLoading(true);
    setError("");

    const result = await verifyEmail(username, verificationCode);
    
    if (result.success) {
      setMessage("Email verified successfully! You can now login.");
      setTimeout(() => {
        onVerificationSuccess();
      }, 2000);
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError("");
    setMessage("");

    const result = await resendVerificationCode(username);
    
    if (result.success) {
      setMessage("Verification code resent! Please check your email.");
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
      {/* Main Card with Apple Morphgism Style */}
      <div className="rounded-2xl morphgism-card p-3 flex flex-col">
        <div className="w-full h-auto flex-1 flex flex-col">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-2xl sm:text-3xl text-black font-bold tracking-tight mb-1 modern-title" style={{color: '#111'}}>
              Verify Email
            </h1>
            <p className="text-sm text-black text-opacity-75 leading-relaxed modern-subtitle" style={{color: '#222'}}>
              Please enter the 6-digit code sent to your email
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-500 bg-opacity-80 text-white text-sm rounded-lg px-3 py-2 mb-2 text-center">
              {error}
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="bg-green-500 bg-opacity-80 text-white text-sm rounded-lg px-3 py-2 mb-2 text-center">
              {message}
            </div>
          )}

          {/* Content Wrapper */}
          <div className="content-wrapper rounded-xl p-2 flex-1 overflow-y-visible">
            <form onSubmit={handleSubmit} className="flex flex-col min-h-0">
              {/* Verification Code Input */}
              <div className="input-group mb-4">
                <Label className="block text-base text-black text-opacity-80 input-label">
                  Verification Code
                </Label>
                <Input 
                  type="text" 
                  placeholder="123456"
                  value={verificationCode}
                  onChange={handleVerificationCodeChange}
                  className="aceternity-input w-full rounded-lg text-base text-center tracking-widest text-xl"
                  maxLength={6}
                />
              </div>

              {/* Verify Button */}
              <button 
                type="submit"
                disabled={isLoading || verificationCode.length !== 6}
                className="login-btn w-full rounded-lg py-2 mb-3 disabled:opacity-50">
                <span className="text-base font-semibold text-black">
                  {isLoading ? "Verifying..." : "Verify Email"}
                </span>
              </button>

              {/* Resend Code Button */}
              <button 
                type="button"
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-sm text-black text-opacity-70 hover:text-opacity-100 mb-3 disabled:opacity-50">
                Didn't receive the code? Resend
              </button>

              {/* Back to Login */}
              <button 
                type="button"
                onClick={onBackToLogin}
                className="text-sm text-black text-opacity-70 hover:text-opacity-100">
                ← Back to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

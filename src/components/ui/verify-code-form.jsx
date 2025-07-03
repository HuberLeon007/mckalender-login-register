import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import "./css/verify-code-form.css";

export default function VerifyCodeForm({ username, onBackToLogin, verifyEmailMock, resendVerificationCodeMock }) {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleCodeChange = (value) => {
    setVerificationCode(value.replace(/\D/g, "").slice(0, 6));
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
    const verify = verifyEmailMock || (async () => ({ success: true }));
    const result = await verify(username, verificationCode);
    if (result.success) {
      setMessage("Email verified successfully! You can now login.");
      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError("");
    setMessage("");
    const resend = resendVerificationCodeMock || (async () => ({ success: true }));
    const result = await resend(username);
    if (result.success) {
      setMessage("Verification code resent! Please check your email.");
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="verify-form-container">
      <div className="rounded-2xl morphgism-card p-8 sm:p-12 flex flex-col shadow-xl bg-white verify-card">
        <button
          type="button"
          aria-label="Back to Signup"
          onClick={() => router.push('/signup')}
          className="back-button"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="w-full h-auto flex-1 flex flex-col">
          <div className="text-center mb-4">
            <h1 className="text-2xl sm:text-3xl text-black font-bold tracking-tight mb-1 modern-title verify-title">
              Verify Your Email
            </h1>
            <p className="text-sm text-black text-opacity-75 leading-relaxed modern-subtitle verify-subtitle">
              Enter the 6-digit code sent to your email
            </p>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg px-3 py-2 mb-2 text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-blue-100 border border-blue-300 text-blue-700 text-sm rounded-lg px-3 py-2 mb-2 text-center">{message}</div>
          )}
          <div className="content-wrapper rounded-xl p-2 flex-1 overflow-y-visible">
            <form onSubmit={handleSubmit} className="flex flex-col min-h-0">
              <div className="flex flex-col items-center mb-6">
                <Label className="block text-base text-black text-opacity-80 input-label mb-4">
                  Verification Code
                </Label>
              </div>
              <div className="verify-code-inputs mb-8">
                {[...Array(6)].map((_, idx) => (
                  <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={verificationCode[idx] || ""}
                    onChange={e => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (!val) {
                        handleCodeChange(verificationCode.slice(0, idx) + "" + verificationCode.slice(idx + 1));
                        return;
                      }
                      let newValue = verificationCode.split("");
                      newValue[idx] = val[val.length - 1];
                      newValue = newValue.join("");
                      handleCodeChange(newValue.padEnd(6, ""));
                      if (val && idx < 5) {
                        e.target.parentNode.children[idx + 1]?.focus();
                      }
                    }}
                    onKeyDown={e => {
                      if (e.key === "Backspace" && !verificationCode[idx] && idx > 0) {
                        e.target.parentNode.children[idx - 1]?.focus();
                      }
                    }}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
              <button type="submit" disabled={isLoading || verificationCode.length !== 6} className="login-btn w-full rounded-lg py-3 mb-4 disabled:opacity-50 text-lg">
                <span className="text-base font-semibold text-black">{isLoading ? "Verifying..." : "Verify Email"}</span>
              </button>
              <div className="resend-container flex flex-col items-center my-8">
                <span className="text-sm text-black text-opacity-70 mb-2">Didn't receive the code?</span>
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="login-btn px-4 py-2 rounded-md font-medium text-black shadow-none hover:text-black focus:text-black resend-button"
                >
                  {isLoading ? "Resending..." : "Resend"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

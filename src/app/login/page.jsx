import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import "./index.css";

export default function Login({}) {
  const GoogleIcon = "/google.svg";
  const FacebookIcon = "/facebook.svg";

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Animation Container */}
      <div className="absolute inset-0 w-full h-full">
        <BackgroundGradientAnimation />
      </div>

      {/* Login Form Container with more spacing */}
      <div className="relative z-10 w-full h-full flex items-center justify-center login-container">
        <div className="w-full max-w-lg xl:max-w-xl login-card-wrapper">
          {/* Login Card with inner spacing */}
          <div className="rounded-3xl logincard login-card-inner">
            <div className="w-full h-auto">
              {/* Header */}
              <div className="text-left login-header">
                <h1 className="text-4xl sm:text-5xl text-white font-bold tracking-tight login-title">
                  Sign In
                </h1>
                <p className="text-lg text-white text-opacity-90 leading-relaxed login-subtitle">
                  Welcome back, you've been missed.
                </p>
              </div>

              {/* Main Content Wrapper with more internal spacing */}
              <div className="content-wrapper rounded-2xl">
                {/* Social Login Buttons */}
                <div className="flex flex-col social-buttons-container">
                  <button className="social-btn flex items-center justify-center gap-4 rounded-xl">
                    <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
                    <span className="text-lg font-medium text-white">
                      Google
                    </span>
                  </button>
                  <button className="social-btn flex items-center justify-center gap-4 rounded-xl">
                    <img
                      src={FacebookIcon}
                      alt="Facebook"
                      className="w-5 h-5"
                    />
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

                {/* Username Input */}
                <div className="input-group">
                  <label className="block text-lg text-white text-opacity-90 input-label">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="login-input w-full rounded-xl text-lg"
                  />
                </div>

                {/* Password Input */}
                <div className="input-group">
                  <label className="block text-lg text-white text-opacity-90 input-label">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="login-input w-full rounded-xl text-lg"
                  />
                </div>

                {/* Remember me and Forgot Password */}
                <div className="flex items-center justify-between remember-forgot-container">
                  <label className="flex items-center remember-label">
                    <input type="checkbox" className="custom-checkbox" />
                    <span className="text-lg text-white text-opacity-80">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-lg text-white hover:text-white transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Sign In Button */}
                <button className="login-btn w-full rounded-xl">
                  <span className="text-xl font-semibold text-white">
                    Sign In
                  </span>
                </button>
              </div>

              {/* Create Account Link */}
              <div className="text-center create-account-container">
                <span className="text-lg text-white text-opacity-80">
                  Don't have an account?{" "}
                </span>
                <a
                  href="#"
                  className="text-lg text-white font-semibold hover:text-white transition-colors"
                >
                  Create New Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

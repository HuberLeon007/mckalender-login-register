"use client";
import React, { useState } from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { CheckCircle, AlertTriangle } from "lucide-react";
import "./index.css";
import "./mobile.css";

export default function Register() {
  const GoogleIcon = "/google.svg";
  const FacebookIcon = "/facebook.svg";
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false
  });

  const [showValidation, setShowValidation] = useState(false);

  const validatePassword = (password, confirmPassword) => {
    const validation = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      match: password === confirmPassword && password.length > 0
    };
    
    setPasswordValidation(validation);
    return validation;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'password' && value.length > 0) {
        setShowValidation(true);
      }
      validatePassword(
        name === 'password' ? value : newFormData.password,
        name === 'confirmPassword' ? value : newFormData.confirmPassword
      );
    }
  };

  const isPasswordValid = () => {
    return Object.values(passwordValidation).every(valid => valid);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Animation Container */}
      <div className="absolute inset-0 w-full h-full">
        <BackgroundGradientAnimation />
      </div>

      {/* Register Form Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center login-container">
        <div className="w-full max-w-lg xl:max-w-xl login-card-wrapper">
          {/* Register Card */}
          <div className="rounded-3xl logincard login-card-inner">
            <div className="w-full h-auto">
              {/* Header */}
              <div className="text-left login-header">
                <h1 className="text-4xl sm:text-5xl text-white font-bold tracking-tight login-title">
                  Sign Up
                </h1>
                <p className="text-lg text-white text-opacity-90 leading-relaxed login-subtitle">
                  Create your account to get started.
                </p>
              </div>

              {/* Main Content Wrapper */}
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

                {/* Name Fields Row */}
                <div className="flex gap-4 name-row">
                  {/* First Name Input */}
                  <div className="input-group flex-1">
                    <label className="block text-lg text-white text-opacity-90 input-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className="login-input w-full rounded-xl text-lg"
                    />
                  </div>

                  {/* Last Name Input */}
                  <div className="input-group flex-1">
                    <label className="block text-lg text-white text-opacity-90 input-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      className="login-input w-full rounded-xl text-lg"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="input-group">
                  <label className="block text-lg text-white text-opacity-90 input-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
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
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    className="login-input w-full rounded-xl text-lg"
                  />
                </div>

                {/* Password Validation */}
                {showValidation && (
                  <div className="custom-validation-box">
                    <div className="validation-header">
                      <span className="validation-title">Password Requirements</span>
                    </div>
                    <div className="validation-items">
                      <div className={`validation-item ${passwordValidation.length ? 'valid' : 'invalid'}`}>
                        {passwordValidation.length ? 
                          <CheckCircle className="w-4 h-4" /> : 
                          <AlertTriangle className="w-4 h-4" />
                        }
                        <span>At least 8 characters</span>
                      </div>
                      <div className={`validation-item ${passwordValidation.uppercase ? 'valid' : 'invalid'}`}>
                        {passwordValidation.uppercase ? 
                          <CheckCircle className="w-4 h-4" /> : 
                          <AlertTriangle className="w-4 h-4" />
                        }
                        <span>One uppercase letter</span>
                      </div>
                      <div className={`validation-item ${passwordValidation.lowercase ? 'valid' : 'invalid'}`}>
                        {passwordValidation.lowercase ? 
                          <CheckCircle className="w-4 h-4" /> : 
                          <AlertTriangle className="w-4 h-4" />
                        }
                        <span>One lowercase letter</span>
                      </div>
                      <div className={`validation-item ${passwordValidation.number ? 'valid' : 'invalid'}`}>
                        {passwordValidation.number ? 
                          <CheckCircle className="w-4 h-4" /> : 
                          <AlertTriangle className="w-4 h-4" />
                        }
                        <span>One number</span>
                      </div>
                      <div className={`validation-item ${passwordValidation.special ? 'valid' : 'invalid'}`}>
                        {passwordValidation.special ? 
                          <CheckCircle className="w-4 h-4" /> : 
                          <AlertTriangle className="w-4 h-4" />
                        }
                        <span>One special character</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Confirm Password Input */}
                <div className="input-group">
                  <label className="block text-lg text-white text-opacity-90 input-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="login-input w-full rounded-xl text-lg"
                  />
                </div>

                {/* Password Match Validation */}
                {formData.confirmPassword.length > 0 && (
                  <div className={`custom-validation-box single-item ${passwordValidation.match ? 'valid-box' : 'invalid-box'}`}>
                    <div className={`validation-item ${passwordValidation.match ? 'valid' : 'invalid'}`}>
                      {passwordValidation.match ? 
                        <CheckCircle className="w-4 h-4" /> : 
                        <AlertTriangle className="w-4 h-4" />
                      }
                      <span>
                        {passwordValidation.match ? "Passwords match" : "Passwords don't match"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Sign Up Button */}
                <button 
                  className={`login-btn w-full rounded-xl ${
                    isPasswordValid() && formData.firstName && formData.lastName && formData.email 
                      ? '' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!isPasswordValid() || !formData.firstName || !formData.lastName || !formData.email}
                >
                  <span className="text-xl font-semibold text-white">
                    Create Account
                  </span>
                </button>
              </div>

              {/* Sign In Link */}
              <div className="text-center create-account-container">
                <span className="text-lg text-white text-opacity-80">
                  Already have an account?{" "}
                </span>
                <a
                  href="/login"
                  className="text-lg text-white font-semibold hover:text-white transition-colors"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

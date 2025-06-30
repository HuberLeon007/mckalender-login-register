"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandFacebook
} from "@tabler/icons-react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import "./morphgism-styles.css";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "personal" // "personal" or "commercial"
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

  const toggleAccountType = () => {
    setFormData(prev => ({
      ...prev,
      accountType: prev.accountType === "personal" ? "commercial" : "personal"
    }));
  };

  const isPasswordValid = () => {
    return Object.values(passwordValidation).every(valid => valid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordValid() && formData.firstName && formData.lastName && formData.email) {
      console.log("Form submitted successfully", formData);
    } else {
      console.log("Form validation failed");
    }
  };
  
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
      {/* Main Card with Apple Morphgism Style */}
      <div className="rounded-2xl morphgism-card p-3 max-h-screen overflow-y-auto flex flex-col">
        <div className="w-full h-auto flex-1 flex flex-col">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-2xl sm:text-3xl text-white font-bold tracking-tight mb-1 modern-title">
              Sign Up
            </h1>
            <p className="text-sm text-white text-opacity-90 leading-relaxed modern-subtitle">
              Join us today and get started
            </p>
          </div>

          {/* Content Wrapper with Glassmorphism */}
          <div className="content-wrapper rounded-xl p-2 flex-1 overflow-y-visible">
            <form onSubmit={handleSubmit} className="flex flex-col min-h-0">
              {/* Social Login Buttons */}
              <div className="flex flex-col social-buttons-container gap-2 mb-2">
                <button 
                  type="button"
                  className="social-btn flex items-center justify-center gap-2 rounded-lg text-base py-2"
                  onClick={() => window.location.href = '/api/auth/google'}>
                  <IconBrandGoogle className="w-4 h-4" />
                  <span className="font-medium text-white">
                    Google
                  </span>
                </button>
                <button 
                  type="button"
                  className="social-btn flex items-center justify-center gap-2 rounded-lg text-base py-2"
                  onClick={() => window.location.href = '/api/auth/facebook'}>
                  <IconBrandFacebook className="w-4 h-4" />
                  <span className="font-medium text-white">
                    Facebook
                  </span>
                </button>
              </div>

              {/* OR Divider */}
              <div className="flex items-center or-divider mb-2">
                <div className="flex-1 h-px bg-white bg-opacity-30"></div>
                <span className="text-base text-white text-opacity-80 or-text px-2">
                  OR
                </span>
                <div className="flex-1 h-px bg-white bg-opacity-30"></div>
              </div>

              {/* Account Type Toggle Switch */}
              <div className="account-type-container mb-4">
                <div className="account-type-header mb-2">
                  <span className="text-base text-white text-opacity-90 input-label">
                    Account Type
                  </span>
                </div>
                <div className="toggle-container">
                  <div className="toggle-wrapper" onClick={toggleAccountType}>
                    <div className={`toggle-track ${formData.accountType === 'commercial' ? 'active' : ''}`}>
                      <div className={`toggle-thumb ${formData.accountType === 'commercial' ? 'commercial' : 'personal'}`}>
                        <div className="toggle-inner-shadow"></div>
                      </div>
                    </div>
                    <div className="toggle-labels">
                      <span className={`toggle-label left ${formData.accountType === 'personal' ? 'active' : ''}`}>
                        Personal Use
                      </span>
                      <span className={`toggle-label right ${formData.accountType === 'commercial' ? 'active' : ''}`}>
                        Commercial Use
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Name Fields Row */}
              <div className="flex gap-2 name-row mb-2">
                <div className="input-group flex-1">
                  <Label className="block text-base text-white text-opacity-90 input-label">
                    First Name
                  </Label>
                  <Input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    className="aceternity-input w-full rounded-lg text-base"
                  />
                </div>
                <div className="input-group flex-1">
                  <Label className="block text-base text-white text-opacity-90 input-label">
                    Last Name
                  </Label>
                  <Input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    className="aceternity-input w-full rounded-lg text-base"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="input-group mb-2">
                <Label className="block text-base text-white text-opacity-90 input-label">
                  Email Address
                </Label>
                <Input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="aceternity-input w-full rounded-lg text-base"
                />
              </div>

              {/* Password Input */}
              <div className="input-group mb-2">
                <Label className="block text-base text-white text-opacity-90 input-label">
                  Password
                </Label>
                <Input 
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="aceternity-input w-full rounded-lg text-base"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="input-group mb-2">
                <Label className="block text-base text-white text-opacity-90 input-label">
                  Confirm Password
                </Label>
                <Input 
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="aceternity-input w-full rounded-lg text-base"
                />
              </div>

              {/* Password Validation Alerts */}
              {showValidation && (
                <div className="password-validation mt-2 mb-2">
                  <div className="validation-container">
                    <ValidationItem 
                      isValid={passwordValidation.length}
                      text="At least 8 characters long"
                    />
                    <ValidationItem 
                      isValid={passwordValidation.uppercase}
                      text="Contains uppercase letter"
                    />
                    <ValidationItem 
                      isValid={passwordValidation.lowercase}
                      text="Contains lowercase letter"
                    />
                    <ValidationItem 
                      isValid={passwordValidation.number}
                      text="Contains number"
                    />
                    <ValidationItem 
                      isValid={passwordValidation.special}
                      text="Contains special character"
                    />
                    <ValidationItem 
                      isValid={passwordValidation.match}
                      text="Passwords match"
                    />
                  </div>
                </div>
              )}

              {/* Sign Up Button */}
              <button 
                type="submit"
                className={`login-btn w-full rounded-lg py-2 mb-2 ${
                  isPasswordValid() && formData.firstName && formData.lastName && formData.email 
                    ? '' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!isPasswordValid() || !formData.firstName || !formData.lastName || !formData.email}>
                <span className="text-base font-semibold text-white">
                  Sign up →
                </span>
              </button>
            </form>
          </div>

          {/* Login Link */}
          <div className="text-center create-account-container mt-2">
            <span className="text-base text-white text-opacity-80">
              Already have an account?{" "}
            </span>
            <a
              href="/signin"
              className="text-base text-white font-semibold hover:text-white transition-colors">
              Sign In
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
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

// Validation Item Component
const ValidationItem = ({ isValid, text }) => {
  return (
    <div className={`validation-item flex items-center gap-2 mb-2 ${isValid ? 'valid' : 'invalid'}`}>
      {isValid ? (
        <CheckCircle className="w-4 h-4 text-green-400" />
      ) : (
        <AlertTriangle className="w-4 h-4 text-red-400" />
      )}
      <span className={`text-sm ${isValid ? 'text-green-300' : 'text-red-300'}`}>
        {text}
      </span>
    </div>
  );
};

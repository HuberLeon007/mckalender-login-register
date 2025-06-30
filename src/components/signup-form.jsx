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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordValid() && formData.firstName && formData.lastName && formData.email) {
      console.log("Form submitted successfully", formData);
    } else {
      console.log("Form validation failed");
    }
  };
  
  return (
    <div className="w-full max-w-lg xl:max-w-xl">
      {/* Main Card with Apple Morphgism Style */}
      <div className="rounded-3xl morphgism-card">
        <div className="w-full h-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl sm:text-5xl text-white font-bold tracking-tight mb-2 modern-title">
              Sign Up
            </h1>
            <p className="text-lg text-white text-opacity-90 leading-relaxed modern-subtitle">
              Join us today and get started with your new account
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

              {/* Name Fields Row */}
              <div className="flex gap-4 name-row mb-4">
                <div className="input-group flex-1">
                  <Label className="block text-lg text-white text-opacity-90 input-label">
                    First Name
                  </Label>
                  <Input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    className="aceternity-input w-full rounded-xl text-lg"
                  />
                </div>
                <div className="input-group flex-1">
                  <Label className="block text-lg text-white text-opacity-90 input-label">
                    Last Name
                  </Label>
                  <Input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    className="aceternity-input w-full rounded-xl text-lg"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="input-group">
                <Label className="block text-lg text-white text-opacity-90 input-label">
                  Email Address
                </Label>
                <Input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="aceternity-input w-full rounded-xl text-lg"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="input-group">
                <Label className="block text-lg text-white text-opacity-90 input-label">
                  Confirm Password
                </Label>
                <Input 
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="aceternity-input w-full rounded-xl text-lg"
                />
              </div>

              {/* Password Validation Alerts */}
              {showValidation && (
                <div className="password-validation mt-4 mb-4">
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
                className={`login-btn w-full rounded-xl mb-6 ${
                  isPasswordValid() && formData.firstName && formData.lastName && formData.email 
                    ? '' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!isPasswordValid() || !formData.firstName || !formData.lastName || !formData.email}>
                <span className="text-xl font-semibold text-white">
                  Sign up →
                </span>
              </button>
            </form>
          </div>

          {/* Login Link */}
          <div className="text-center create-account-container">
            <span className="text-lg text-white text-opacity-80">
              Already have an account?{" "}
            </span>
            <a
              href="/login"
              className="text-lg text-white font-semibold hover:text-white transition-colors">
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

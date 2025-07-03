"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle, IconBrandFacebook, IconEye, IconEyeOff } from "@tabler/icons-react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import AccountTypeToggle from "@/components/ui/account-type-toggle";
import { getUserTimezone } from "@/lib/auth";
import "./css/input.css";

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "personal", // "personal" or "commercial"
    timezone: "",
    rolle: "user",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false,
  });

  const [showValidation, setShowValidation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Set timezone on component mount
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      timezone: getUserTimezone(),
    }));
  }, []);

  const validatePassword = (password, confirmPassword) => {
    const validation = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      match: password === confirmPassword && password.length > 0,
    };

    setPasswordValidation(validation);
    return validation;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setError("");

    if (name === "password" || name === "confirmPassword") {
      if (name === "password" && value.length > 0) {
        setShowValidation(true);
      }
      validatePassword(
        name === "password" ? value : newFormData.password,
        name === "confirmPassword" ? value : newFormData.confirmPassword
      );
    }
  };

  const handleAccountTypeChange = (newAccountType) => {
    setFormData((prev) => ({
      ...prev,
      accountType: newAccountType,
    }));
  };

  const isPasswordValid = () => {
    return Object.values(passwordValidation).every((valid) => valid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Zeige die Zeitzone in der Konsole beim Anmelden
    console.log("User Timezone:", formData.timezone);

    if (
      !isPasswordValid() ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.username
    ) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simuliere Registrierung lokal
    console.log("Register called:", {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      password: formData.password,
      email: formData.email,
      timezone: formData.timezone,
      rolle: formData.rolle,
      company: formData.accountType === "commercial",
    });

    router.push(`/verify?username=${encodeURIComponent(formData.username)}`);
    setIsLoading(false);
  };

  const handleGoogleAuth = async () => {
    // Redirect to Google auth endpoint for registration
    window.location.href = "/auth/google/register";
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
      {/* Main Card with Apple Morphgism Style */}
      <div className="rounded-2xl morphgism-card p-3 flex flex-col">
        <div className="w-full h-auto flex flex-col">
          {/* Header */}
          <div className="text-center mb-4">
            <h1
              className="text-2xl sm:text-3xl text-black font-bold tracking-tight mb-1 modern-title"
              style={{ color: "#111" }}
            >
              Sign Up
            </h1>
            <p
              className="text-sm text-black text-opacity-75 leading-relaxed modern-subtitle"
              style={{ color: "#222" }}
            >
              Join us today and get started
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg px-3 py-2 mb-2 text-center">
              {error}
            </div>
          )}

          {/* Content Wrapper with Glassmorphism */}
          <div className="content-wrapper rounded-xl p-2 flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col">
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

              {/* Account Type Toggle Switch */}
              <AccountTypeToggle
                value={formData.accountType}
                onChange={handleAccountTypeChange}
              />

              {/* Name Fields Row */}
              <div className="flex gap-2 name-row mb-2">
                <div className="input-group flex-1">
                  <Label className="block text-base text-black text-opacity-80 input-label">
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
                  <Label className="block text-base text-black text-opacity-80 input-label">
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

              {/* Username Input */}
              <div className="input-group mb-2">
                <Label className="block text-base text-black text-opacity-80 input-label">
                  Username
                </Label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="aceternity-input w-full rounded-lg text-base"
                />
              </div>

              {/* Email Input */}
              <div className="input-group mb-2">
                <Label className="block text-base text-black text-opacity-80 input-label">
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
              <div className="input-group mb-2 relative">
                <Label className="block text-base text-black text-opacity-80 input-label">
                  Password
                </Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
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

              {/* Confirm Password Input */}
              <div className="input-group mb-2 relative">
                <Label className="block text-base text-black text-opacity-80 input-label">
                  Confirm Password
                </Label>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="aceternity-input w-full rounded-lg text-base pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 flex items-center justify-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <IconEyeOff className="w-5 h-5 opacity-70" />
                  ) : (
                    <IconEye className="w-5 h-5 opacity-70" />
                  )}
                </button>
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
                disabled={
                  isLoading ||
                  !isPasswordValid() ||
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.email ||
                  !formData.username
                }
                className="login-btn w-full rounded-lg py-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-base font-semibold text-black">
                  {isLoading ? "Creating Account..." : "Sign up →"}
                </span>
              </button>
            </form>
          </div>

          {/* Login Link */}
          <div className="text-center create-account-container mt-2">
            <span className="text-base text-black text-opacity-70">
              Already have an account?{" "}
            </span>
            <a
              href="/auth/signin"
              className="text-base text-black font-semibold hover:text-opacity-80 transition-colors"
            >
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

// Validation Item Component
const ValidationItem = ({ isValid, text }) => {
  return (
    <div
      className={`validation-item flex items-center gap-2 mb-2 ${
        isValid ? "valid" : "invalid"
      }`}
    >
      {isValid ? (
        <CheckCircle className="w-4 h-4 text-blue-600" />
      ) : (
        <AlertTriangle className="w-4 h-4 text-red-600" />
      )}
      <span
        className={`text-sm ${isValid ? "text-blue-700" : "text-red-700"}`}
      >
        {text}
      </span>
    </div>
  );
};

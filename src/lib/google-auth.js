// Google OAuth configuration and utilities
"use client";

let googleConfig = null;
let googleAuthInitialized = false;

// Initialize Google OAuth
export async function initializeGoogleAuth() {
  try {
    // Get Google configuration from backend
    const response = await fetch("/auth/google/config");
    googleConfig = await response.json();

    if (googleConfig.enabled && googleConfig.client_id) {
      // Check if Google Identity Services is available
      if (
        typeof window !== "undefined" &&
        window.google &&
        window.google.accounts
      ) {
        window.google.accounts.id.initialize({
          client_id: googleConfig.client_id,
          callback: handleGoogleCallback,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        googleAuthInitialized = true;
        console.log("Google OAuth initialized successfully");
        return true;
      } else {
        console.warn("Google Identity Services not loaded");
        return false;
      }
    } else {
      console.log("Google OAuth not enabled or configured");
      return false;
    }
  } catch (error) {
    console.error("Failed to initialize Google OAuth:", error);
    return false;
  }
}

// Default callback handler - can be overridden
let handleGoogleCallback = (response) => {
  console.log("Google OAuth response:", response);
};

// Set custom callback handler
export function setGoogleCallback(callback) {
  handleGoogleCallback = callback;

  // Reinitialize with new callback if already initialized
  if (googleAuthInitialized && googleConfig) {
    window.google.accounts.id.initialize({
      client_id: googleConfig.client_id,
      callback: callback,
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  }
}

// Render Google Sign-In button
export function renderGoogleButton(containerId, options = {}) {
  if (!googleAuthInitialized) {
    console.warn("Google OAuth not initialized");
    return false;
  }

  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container with ID '${containerId}' not found`);
    return false;
  }

  const defaultOptions = {
    theme: "outline",
    size: "large",
    text: "signin_with",
    width: "100%",
  };

  window.google.accounts.id.renderButton(container, {
    ...defaultOptions,
    ...options,
  });
  return true;
}

// Prompt Google Sign-In
export function promptGoogleSignIn() {
  if (!googleAuthInitialized) {
    console.warn("Google OAuth not initialized");
    return false;
  }

  window.google.accounts.id.prompt();
  return true;
}

// Get Google token for registration (returns a Promise)
export function getGoogleToken() {
  return new Promise((resolve, reject) => {
    if (!googleAuthInitialized) {
      reject(new Error("Google OAuth not initialized"));
      return;
    }

    // Temporarily override callback
    const originalCallback = handleGoogleCallback;
    setGoogleCallback((response) => {
      // Restore original callback
      setGoogleCallback(originalCallback);
      resolve(response.credential);
    });

    // Prompt for sign-in
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Restore original callback on cancel
        setGoogleCallback(originalCallback);
        resolve(null);
      }
    });
  });
}

// Check if Google OAuth is available
export function isGoogleAuthAvailable() {
  return googleAuthInitialized;
}

// Load Google Identity Services script
export function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window object not available"));
      return;
    }

    if (window.google && window.google.accounts) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // Wait a bit for the script to fully initialize
      setTimeout(() => {
        if (window.google && window.google.accounts) {
          resolve(true);
        } else {
          reject(
            new Error("Google Identity Services not available after loading")
          );
        }
      }, 100);
    };

    script.onerror = () => {
      reject(new Error("Failed to load Google Identity Services script"));
    };

    document.head.appendChild(script);
  });
}

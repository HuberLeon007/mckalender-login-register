"use client";
import { useState, useEffect } from "react";
import {
  loadGoogleScript,
  initializeGoogleAuth,
  setGoogleCallback,
  isGoogleAuthAvailable,
} from "@/lib/google-auth";
import { handleGoogleLogin, handleGoogleRegister } from "@/lib/auth";

export function useGoogleAuth() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function initialize() {
      try {
        // Load Google script
        await loadGoogleScript();
        setIsLoaded(true);

        // Initialize Google Auth
        const initialized = await initializeGoogleAuth();
        setIsInitialized(initialized);

        if (!initialized) {
          setError("Google OAuth not available");
        }
      } catch (err) {
        console.error("Google Auth initialization error:", err);
        setError(err.message);
      }
    }

    initialize();
  }, []);

  const signInWithGoogle = async () => {
    if (!isInitialized) {
      throw new Error("Google Auth not initialized");
    }

    return new Promise((resolve, reject) => {
      setGoogleCallback(async (response) => {
        try {
          const result = await handleGoogleLogin(response.credential);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      // Prompt for sign-in
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          reject(new Error("Google sign-in was cancelled"));
        }
      });
    });
  };

  const registerWithGoogle = async (additionalData = {}) => {
    if (!isInitialized) {
      throw new Error("Google Auth not initialized");
    }

    return new Promise((resolve, reject) => {
      setGoogleCallback(async (response) => {
        try {
          const result = await handleGoogleRegister(
            response.credential,
            additionalData
          );
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      // Prompt for sign-in
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          reject(new Error("Google registration was cancelled"));
        }
      });
    });
  };

  return {
    isLoaded,
    isInitialized,
    error,
    signInWithGoogle,
    registerWithGoogle,
    isAvailable: isInitialized,
  };
}

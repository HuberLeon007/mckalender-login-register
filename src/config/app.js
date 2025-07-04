// Application configuration
export const CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8443",
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
};

// Make config available globally for client-side usage
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
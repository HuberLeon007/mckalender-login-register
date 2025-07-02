// Authentication utility functions

// Get the base URL from the configuration
export function getBaseUrl() {
    return (typeof window !== 'undefined' && window.CONFIG && window.CONFIG.BASE_URL) 
        ? window.CONFIG.BASE_URL 
        : 'https://localhost:8443';
}

// Get user timezone
export function getUserTimezone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
        return 'Europe/Berlin';
    }
}

// Login function
export async function loginUser(username, password) {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            return { success: true, data };
        } else {
            return { 
                success: false, 
                error: data.message || 'Login failed',
                needsVerification: response.status === 403 && data.email_verified === false,
                data
            };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Error during login' };
    }
}

// Register function
export async function registerUser(userData) {
    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userData.username,
                password: userData.password,
                email: userData.email,
                timezone: userData.timezone || getUserTimezone(),
                rolle: userData.rolle || 'user',
                company: userData.company || false
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            return { 
                success: true, 
                data,
                needsVerification: data.email_verification_required
            };
        } else {
            return { 
                success: false, 
                error: data.message || 'Registration failed'
            };
        }
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: 'Error during registration' };
    }
}

// Verify email function
export async function verifyEmail(username, verificationCode) {
    try {
        const response = await fetch('/auth/verify-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                verification_code: verificationCode
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            return { success: true, data };
        } else {
            return { 
                success: false, 
                error: data.message || 'Verification failed'
            };
        }
    } catch (error) {
        console.error('Verification error:', error);
        return { success: false, error: 'Error during verification' };
    }
}

// Resend verification code function
export async function resendVerificationCode(username) {
    try {
        const response = await fetch('/auth/resend-verification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username })
        });

        const data = await response.json();
        
        if (response.ok) {
            return { success: true, data };
        } else {
            return { 
                success: false, 
                error: data.message || 'Failed to resend code'
            };
        }
    } catch (error) {
        console.error('Resend error:', error);
        return { success: false, error: 'Error resending code' };
    }
}

// Google OAuth functions
export async function handleGoogleLogin(token) {
    try {
        const response = await fetch('/auth/google/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token })
        });

        const data = await response.json();
        
        if (response.ok) {
            return { success: true, data };
        } else {
            return { 
                success: false, 
                error: data.message || 'Google login failed'
            };
        }
    } catch (error) {
        console.error('Google login error:', error);
        return { success: false, error: 'Error during Google login' };
    }
}

export async function handleGoogleRegister(token, userData) {
    try {
        const response = await fetch('/auth/google/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                timezone: userData.timezone || getUserTimezone(),
                rolle: userData.rolle || 'user',
                company: userData.company || false
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            return { success: true, data };
        } else {
            return { 
                success: false, 
                error: data.message || 'Google registration failed'
            };
        }
    } catch (error) {
        console.error('Google registration error:', error);
        return { success: false, error: 'Error during Google registration' };
    }
}

// Check authentication status
export async function checkAuth() {
    try {
        const response = await fetch('/auth/verify', {
            method: 'GET',
            credentials: 'same-origin'
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, authenticated: data.authenticated, user: data.user };
        } else {
            return { success: false, authenticated: false };
        }
    } catch (error) {
        console.error('Auth check error:', error);
        return { success: false, authenticated: false };
    }
}

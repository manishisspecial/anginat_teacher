'use client';

import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Input from "@/components/reusableComponents/InputField/inputField";
import Button from "@/components/reusableComponents/buttons/Button";

export const LoginScreen = () => {
    const router = useRouter();
    const { login, loading, error: authError, isAuthenticated } = useAuth();

    // State for form data
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // State for form validation
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    // Password visibility toggle
    const [showPassword, setShowPassword] = useState(false);

    // Check if user is already authenticated
    useEffect(() => {
        if (isAuthenticated()) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    // Handle input changes
    const handleEmailChange = (value) => {
        setFormData({
            ...formData,
            email: value,
        });

        // Clear errors when user types
        if (errors.email) {
            setErrors({
                ...errors,
                email: "",
            });
        }
    };

    const handlePasswordChange = (value) => {
        setFormData({
            ...formData,
            password: value,
        });

        // Clear errors when user types
        if (errors.password) {
            setErrors({
                ...errors,
                password: "",
            });
        }
    };

    // Validate form
    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: "", password: "" };

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const result = await login(formData.email, formData.password);

            if (result.success) {
                // Login successful, user data and tokens are now loaded
                console.log('Login successful:', result.data);
                router.push('/dashboard');
            }
            // Error handling is done by the AuthContext and shown via authError
        } catch (error) {
            console.error("Login error:", error);
            // Additional errors will be shown via authError from context
        }
    };

    // Handle forgot password
    const handleForgotPassword = () => {
        // Navigate to forgot password page or implement forgot password logic
        router.push('/forgot-password');
    };

    // Handle signup redirect
    const handleSignUp = () => {
        // Navigate to signup page
        router.push('/register');
    };

    // Custom password toggle icon
    const PasswordToggleIcon = () => (
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-zinc-600 hover:text-zinc-800 transition-colors"
        >
            {showPassword ? (
                <Eye className="w-4 h-4" />
            ) : (
                <EyeOff className="w-4 h-4" />
            )}
        </button>
    );

    return (
        <div className="bg-[#f9f9f9] flex flex-row justify-center w-full min-h-screen">
            <div className="bg-[#f9f9f9] w-full max-w-[1440px] flex justify-center items-center py-8">
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full max-w-[448px] items-center gap-2.5 p-8 bg-white rounded-2xl shadow-[0px_0px_20px_#0000001a]"
                >
                    <div className="flex flex-col w-full items-center gap-4">
                        <div className="relative self-stretch mt-[-1.00px] font-bold text-neutral-900 text-2xl text-center">
                            ANGINAT ADMIN
                        </div>

                        <div className="flex flex-col items-center gap-8 relative self-stretch w-full">
                            <p className="relative self-stretch mt-[-1.00px] font-medium text-zinc-600 text-lg text-center">
                                Sign In To Your Account
                            </p>

                            {/* Display auth error */}
                            {authError && (
                                <div className="w-full p-3 bg-red-100 text-red-700 rounded text-center">
                                    {authError}
                                </div>
                            )}

                            <div className="flex flex-col items-start gap-6 relative self-stretch w-full">
                                <div className="flex flex-col items-start gap-6 relative self-stretch w-full">
                                    <div className="flex flex-col items-end gap-4 relative self-stretch w-full">
                                        <div className="flex flex-col items-start gap-4 relative self-stretch w-full">

                                            {/* Email Input */}
                                            <div className="relative self-stretch w-full">
                                                <Input
                                                    label="Email"
                                                    placeholder="Enter your email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleEmailChange}
                                                    showLabel={true}
                                                    showSupportingText={errors.email ? true : false}
                                                    supportingText={errors.email}
                                                    error={errors.email ? true : false}
                                                    errorText={errors.email}
                                                    size="large"
                                                    fullWidth={true}
                                                    className="w-full"
                                                    disabled={loading}
                                                />
                                            </div>

                                            {/* Password Input */}
                                            <div className="relative self-stretch w-full">
                                                <Input
                                                    label="Password"
                                                    placeholder="Enter your password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={formData.password}
                                                    onChange={handlePasswordChange}
                                                    showLabel={true}
                                                    showSupportingText={errors.password ? true : false}
                                                    supportingText={errors.password}
                                                    error={errors.password ? true : false}
                                                    errorText={errors.password}
                                                    showRightIcon={true}
                                                    rightIcon={<PasswordToggleIcon />}
                                                    size="large"
                                                    fullWidth={true}
                                                    className="w-full"
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleForgotPassword}
                                            className="relative self-stretch font-normal text-blue-600 text-sm text-right hover:underline transition-all"
                                            disabled={loading}
                                        >
                                            Forgot password?
                                        </button>
                                    </div>

                                    <div className="w-full">
                                        <Button
                                            text={loading ? "Signing in..." : "Sign In"}
                                            state={loading ? "Disabled" : "Default"}
                                            type="Primary"
                                            variant="Default"
                                            onClick={handleSubmit}
                                            fullWidth={true}
                                            className="w-full"
                                            disabled={loading}
                                        />
                                    </div>

                                    <div className="inline-flex items-center gap-1 relative justify-center w-full">
                                        <div className="relative w-fit font-normal text-zinc-600 text-sm whitespace-nowrap">
                                            Don't have an account?
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleSignUp}
                                            className="relative w-fit font-normal text-blue-600 text-sm whitespace-nowrap hover:underline transition-all"
                                            disabled={loading}
                                        >
                                            Sign up
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;
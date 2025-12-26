"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import TextFieldWithLabel from "./TextFieldWithLabel";
import PrimaryButton from "../ui/PrimaryButton";
import { useAuthStore } from "@/stores/authStore";
import { LogIn } from "lucide-react";
import type { LoginCredentials } from "@/types/auth";

const LoginForm = () => {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      await login(formData);

      // Check if login was successful
      const { isAuthenticated } = useAuthStore.getState();
      if (isAuthenticated) {
        router.push("/");
      }
    } catch (error) {
      // Error is already handled in the store
      console.error("Login error:", error);
    }
  };

  const handleChange = (field: keyof LoginCredentials, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (error) {
      clearError();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full" noValidate>
      <div className="space-y-4">
        <TextFieldWithLabel
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="admin@example.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={validationErrors.email}
          required
          disabled={isLoading}
          autoComplete="email"
        />

        <TextFieldWithLabel
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={validationErrors.password}
          required
          disabled={isLoading}
          autoComplete="current-password"
          showPasswordToggle
        />
      </div>

      {error && (
        <div
          className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm"
          role="alert"
        >
          <p className="font-medium">Login Failed</p>
          <p className="mt-1">{error}</p>
        </div>
      )}

      <PrimaryButton
        type="submit"
        fullWidth
        loading={isLoading}
        leftIcon={!isLoading ? <LogIn className="h-4 w-4" /> : undefined}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </PrimaryButton>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Test your NestJS backend integration
        </p>
      </div>
    </form>
  );
};

export default LoginForm;

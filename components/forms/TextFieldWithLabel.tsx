"use client";

import React, { useState, forwardRef, InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TextFieldWithLabelProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  error?: string;
  helperText?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  showPasswordToggle?: boolean;
}

const TextFieldWithLabel = forwardRef<
  HTMLInputElement,
  TextFieldWithLabelProps
>(
  (
    {
      label,
      type = "text",
      error,
      helperText,
      required,
      containerClassName,
      labelClassName,
      inputClassName,
      showPasswordToggle = true,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    const inputType =
      isPasswordField && showPassword && showPasswordToggle ? "text" : type;

    return (
      <div className={cn("w-full", containerClassName)}>
        <label
          htmlFor={props.id || props.name}
          className={cn(
            "mb-2 block text-sm font-medium text-foreground",
            disabled && "opacity-60 cursor-not-allowed",
            labelClassName
          )}
        >
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </label>
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={cn(
              "flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-60",
              error && "border-destructive focus:ring-destructive",
              isPasswordField && showPasswordToggle && "pr-11",
              inputClassName,
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${props.id || props.name}-error`
                : helperText
                ? `${props.id || props.name}-helper`
                : undefined
            }
            {...props}
          />
          {isPasswordField && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2",
                "text-muted-foreground hover:text-foreground",
                "transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-sm p-0.5",
                "disabled:cursor-not-allowed disabled:opacity-60"
              )}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p
            id={`${props.id || props.name}-error`}
            className="mt-1.5 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${props.id || props.name}-helper`}
            className="mt-1.5 text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextFieldWithLabel.displayName = "TextFieldWithLabel";

export default TextFieldWithLabel;

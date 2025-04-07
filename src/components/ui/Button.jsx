import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
  className = "",
  type = "button",
  icon,
  iconPosition = "left",
  fullWidth = false,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center rounded-md font-medium
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    transition-all duration-200 ease-in-out relative overflow-hidden
    ${fullWidth ? "w-full" : ""}
  `;

  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
    secondary: "bg-gray-800 hover:bg-gray-700 text-white",
    outline:
      "border border-gray-300 hover:bg-gray-50 text-gray-700 dark:border-gray-600 dark:hover:bg-gray-700/30 dark:text-gray-200",
    ghost:
      "hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-700/50 dark:text-gray-200",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? disabledClasses : ""}
        ${className}
      `}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      type={type}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
      {!disabled && (
        <motion.span
          className="absolute inset-0 bg-white/10 opacity-0"
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
};

export default Button;

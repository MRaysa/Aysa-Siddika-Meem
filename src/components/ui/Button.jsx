import { motion } from "framer-motion";

// Terminal-styled button. Variants map onto the design tokens.
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
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-mono font-medium transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes = {
    small: "px-3 py-1.5 text-xs",
    medium: "px-4 py-2 text-sm",
    large: "px-5 py-2.5 text-sm",
  };

  const variants = {
    primary:
      "bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90",
    outline:
      "border border-[var(--border)] bg-transparent text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
    ghost: "text-[var(--muted)] hover:text-[var(--fg)]",
    danger: "bg-[var(--red)] text-white hover:opacity-90",
  };

  return (
    <motion.button
      whileHover={!disabled ? { y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`${base} ${sizes[size]} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      type={type}
      {...props}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </motion.button>
  );
};

export default Button;

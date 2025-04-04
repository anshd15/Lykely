import React from "react";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  onClick,
  loading = false,
  className = "",
  icon: Icon,
  variant = "primary",
}) {
  const baseStyles = "px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-200";

  const variants = {
    primary: "bg-pink-500 hover:bg-pink-600 text-white shadow-md",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${baseStyles} ${variants[variant]} ${className} ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {loading ? <Loader2 className="animate-spin w-5 h-5" /> : Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}

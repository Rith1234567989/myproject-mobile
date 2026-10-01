import React from "react";
import { View } from "react-native";

interface DividerProps {
  variant?: "thin" | "thick";
  className?: string;
}

const Divider = ({ variant = "thin", className = "" }: DividerProps) => {
  const baseClass =
    variant === "thick"
      ? "h-2 w-full bg-gray-100"
      : "h-[1px] w-full bg-gray-200";

  return <View className={`${baseClass} ${className}`} />;
};

export default Divider;

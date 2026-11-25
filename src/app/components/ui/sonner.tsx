"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        style: {
          background: '#2F2F2F',
          color: '#ffffff',
          border: '1px solid #E50914',
          fontSize: '14px',
          fontFamily: 'Montserrat, sans-serif',
        },
        className: 'netflix-toast',
      }}
      {...props}
    />
  );
};

export { Toaster };
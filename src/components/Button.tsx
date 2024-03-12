import React from "react";
import { Oval } from "react-loader-spinner";
import { twMerge } from "tailwind-merge";

interface IButton {
  className?: string;
  size?: string;
  loading?: boolean;
  onClick?: Function;
  loaderColor?: string;
  children: React.ReactNode;
}

export function Button({ className, loading = false, onClick, loaderColor, children, ...props }: IButton) {
  return (
    <button
      onClick={() => {
        if (loading) return;
        if (onClick) onClick();
      }}
      className={twMerge(
        "p-2 rounded-md transition disabled:opacity-50 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white",
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="flex gap-3 items-center justify-center">
          <Oval height={20} width={20} color={loaderColor} />
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
}

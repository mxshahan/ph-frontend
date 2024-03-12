import React from "react";
import { Oval } from "react-loader-spinner";
import { twMerge } from "tailwind-merge";

interface ISpin {
  children?: React.ReactNode;
  spinning?: boolean;
  title?: React.ReactNode;
  className?: string;
}
export function Spin({ spinning = false, title = "", children, className }: ISpin) {
  return (
    <div className={twMerge("", spinning ? "relative" : "", className)}>
      {spinning && (
        <div className="absolute w-full h-full max-h-screen flex flex-col items-center justify-center bg-sky-50 bg-opacity-60">
          <Oval color="red" width={50} />
          {title && <span>{title}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

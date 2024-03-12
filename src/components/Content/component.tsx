import React from "react";

export const Content = ({ children }: { children: React.ReactNode }) => {
  return <div className={`p-5 h-screen flex-1`}>{children}</div>;
};

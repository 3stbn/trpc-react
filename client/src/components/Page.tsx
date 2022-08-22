import React from "react";

export function Page({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

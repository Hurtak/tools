import { ReactNode } from "react";

export const Layout = ({ children }: {
  children: ReactNode;
}) => (
  <main style={{ minHeight: "100vh", backgroundColor: "red" }}>
    {children}
  </main>
);

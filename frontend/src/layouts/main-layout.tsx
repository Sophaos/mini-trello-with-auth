import { TopMenuBar } from "@/components/top-menu-bar";
import { type ReactNode } from "react";

interface MenuLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MenuLayoutProps) => {
  return (
    <>
      <TopMenuBar />
      {children}
    </>
  );
};

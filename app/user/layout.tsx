"use client";
import { ReactNode, useContext, useEffect } from "react";
import Main from "../Desgins/Main/Main";
import Sidebar from "../Desgins/Sidebar/Sidebar";
import "./dashboard.css";
import { UserAuthContext } from "@/Contexts/AuthContext";
import { useRouter } from "next/navigation";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: DashboardLayoutProps) {
  const auth = useContext(UserAuthContext);
  const router = useRouter();
  if (!auth) return null;

  const { user, loading } = auth;
  // console.log(user);
  useEffect(() => {
    if (!loading && !user) {
      alert("Session expired / Unauthorized access! Please login.");
      router.push("/login");
    }
  }, [user, loading, router]);

  // Prevent rendering before auth check finishes
  if (loading) {
    return <p>Loading...</p>;
  }

  // Prevent unauthorized content flash
  if (!user) {
    return null;
  }
  return (
    <div className="dashboard">
      <Sidebar />
      <Main>{children}</Main>
    </div>
  );
}

"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { createContext, useState, useEffect, useContext } from "react";
import Link from "next/link";
import Navbar from "./component/Navbar";

const inter = Inter({ subsets: ["latin"] });

const AuthContext = createContext();

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // You can add more state variables if needed

  useEffect(() => {
    // Your authentication logic goes here

    // Example: Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading }}>
      <html lang="en">
        <body className={inter.className}>
         <Navbar />
          {children}
        </body>
      </html>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

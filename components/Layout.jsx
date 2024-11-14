"use client";

import { AdminProvider } from "@/context/admin";
import { CartProvider } from "@/context/cart";
import { UserProvider } from "@/context/user";
import { useEffect } from "react";
import Navbar from "./Navbar";

export function Layout({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.min.js");
    }
  });
  return (
    <AdminProvider>
      <UserProvider>
        <CartProvider>
          <main>
            <Navbar />
            <div>{children}</div>
          </main>
        </CartProvider>
      </UserProvider>
    </AdminProvider>
  );
}

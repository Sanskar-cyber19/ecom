"use client";
import { DB } from "@/config/constants";
import { getData } from "@/config/db";
import db from '@/config/db.json'
// import {writeFile} from 'node:fs'
// import path from 'path'
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const initialState = {
  password: "",
  id: "",
  email: "",
  phone: "",
  name: "",
  orders: [], // Initialize orders in user state
};

// Create context
const UserContext = createContext(initialState);

const orderNo = () => {
  let generatedNo = '';
  for (let i = 0; i < 10; i++) {
    generatedNo += String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }
  return generatedNo;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);
  const Router = useRouter();

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (credentials) => {
    try {
      // const response = await fetch(`${DB}/api/login/`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(credentials),
      // });

      // if (!response.ok) throw new Error("Login failed");

      // const userData = await response.json();
      const userData = db.user.find(u=>u.email === credentials.email && u.password === credentials.password)
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData)); // Store user data
      Router.push("/user");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch(`${DB}/api/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Signup failed: ${error.status}`);
      }

      const newUserData = await response.json();
      setUser(newUserData);
      Router.push("/user");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const logout = () => {
    setUser(initialState);
    localStorage.removeItem("user"); // Clear user data from localStorage
    Router.push("/");
  };

  const changePassword = async (userId, newPassword) => {
    try {
      const response = await fetch(`${DB}/api/user/${userId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) throw new Error("Password change failed");

      const newData = await response.json(); // Wait for response.json() to resolve
      setUser(newData); // Update user state with new data
      Router.push("/user");
    } catch (error) {
      console.error("Password change error:", error);
    }
  };

  const addOrder = async (cart,user, address) => {
    const orderno = orderNo();
    const order = {
      orderno: `${orderno}`,
      products: cart,
      address: address,
      user: `${user}`,
      deliverydate:'12/2/2025'
    };
    try {
      // const response = await fetch(`${DB}/api/order/`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(order),
      // });
      // if (!response.ok) throw new Error("Order creation failed");
      
      // Router.push("/user");
      db.order.push(order)
      // const filepath = path.join(process.cwd(), '/config/db.json')
      //  writeFile(filepath,JSON.stringify(db,null,2))
    } catch (error) {
      console.error("Add order error:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        changePassword,
        addOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using user context
export const useUser = () => {
  return useContext(UserContext);
};

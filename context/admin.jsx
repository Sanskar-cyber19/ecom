"use client";
import { DB } from "@/config/constants";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const initialState = {
  status:'unauth',
  admin:'',
  password:''
};

const adminData = {
    admin : 'admin',
    password : 'admin',
}

// Create context
const AdminContext = createContext(initialState);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(initialState);
  const [order, setOrders] = useState([]);
  const Router = useRouter();

  const login = async (credentials) => {
    try {
        if(credentials.admin === adminData.admin){
            Router.push('/admin')
            alert('login Succesful')
        }
        setAdmin({
            status:'authrited',
            admin:credentials.admin,
            password:credentials.password,
        })
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setAdmin(initialState);
    Router.push("/");
  };

  const orders = async () => {
    try {
        const res = await fetch(`${DB}/api/order/`)
        const data = await res.json()
        setOrders([data])
    } catch (error) {
        console.error(error)
    }
  };


  return (
    <AdminContext.Provider
      value={{
        admin,
        login,
        logout,
        order,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook for using user context
export const useAdmin = () => {
  return useContext(AdminContext);
};

'use client';

import { useUser } from "@/context/user";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const { login } = useUser();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        login(userData);
        alert('Login successful');
    };

    return (
        <div className="container">
        <div className="card mx-auto my-5 w-75">
            <h3 className="card-header text-center">Welcome Back</h3>
            <form className="card-body px-4" onSubmit={handleSubmit}>
                <h4 className="text-center">Login Here</h4>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        placeholder="name@example.com"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        required
                    />
                    <label htmlFor="emailInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="passwordInput"
                        placeholder="Password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        required
                    />
                    <label htmlFor="passwordInput">Password</label>
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <h6 className="text-center text-muted">New User? <Link href='/auth/signup'>Sign Up</Link></h6>
        </div>
        </div>
    );
}

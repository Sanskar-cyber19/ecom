'use client';

import { useUser } from "@/context/user";
import { useState } from "react";
import Link from 'next/link';

export default function Signup() {
    const { signup } = useUser();
    const [cPassword, setCPassword] = useState('');
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cPassword !== userData.password) {
            alert('Passwords do not match');
            return;
        }

        signup(userData);
        alert('Sign up successful');
    };

    return (
        <div className="card mx-auto my-1 w-75 sm-100">
            <h3 className="card-header text-center">Welcome</h3>
            <form className="card-body px-4" onSubmit={handleSubmit}>
                <h4 className="text-center">Sign Up Here</h4>
                {['name', 'phone', 'email', 'password'].map((field,index) => (
                    <div className="form-floating mb-3" key={index}>
                        <input
                            type={field === 'password' ? 'password' : 'text'}
                            className="form-control"
                            id={`${field}Input`}
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={userData[field]}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor={`${field}Input`}>
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                    </div>
                ))}

                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPasswordInput"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={cPassword}
                        onChange={(e) => setCPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="confirmPasswordInput">Confirm Password</label>
                </div>

                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>
            <h6 className="text-center text-muted">
                Already signed up? <Link href='/auth/login'>Login Now</Link>
            </h6>
        </div>
    );
}

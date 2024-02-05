import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


function Login() {
    const {loginUser} = useContext(AuthContext)
    const handleSubmit = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value

        email.length > 0 && loginUser(email, password)

        console.log(email)
        console.log(password)

    }
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;
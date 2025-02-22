import React from 'react';
import { CiMail, CiUser, CiLock } from "react-icons/ci";
import './login.css';

const LoginPage = () => {
  return (
    <div className="content">
        <form>
            <h1>Login</h1>
            <div className="form-group">
                <input type="text" id="username" placeholder="Username" />
                <CiUser className='icon' />
            </div>
            <div className="form-group">
                <input type="password" id="password" placeholder="Password" />
                <CiLock className='icon'/>
            </div>
            <div className="form-group">
                <input type="email" id="email" placeholder="Email" />
                <CiMail className='icon'/>
            </div>

            <div className="remember-me-container">
                <div className="remember-me">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <a href="#">Forgot password?</a>
            </div>

            <button type="submit">Login</button>

            <div className='sign-up'>
                <p>Don't have an account? <a href="#">Sign up</a></p>
            </div>
        </form>
    </div>
  );
};

export default LoginPage;

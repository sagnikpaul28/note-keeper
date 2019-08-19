import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class Login extends React.Component {
    render() {
        return (
            <div className="login">
                <p className="title">Log In</p>
                <div className="contents">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" id="email"></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" id="password"></input>
                    </div>
                    <button className="submit">Continue</button>
                    <p className="signup-link">
                        Don't have an account?
                        <Link to="/sign-up" className="link">Sign Up</Link>
                        .
                    </p>
                </div>
            </div>
        )
    }
}
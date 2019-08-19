import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class SignUp extends React.Component {
    render() {
        return (
            <div className="signup">
                <p className="title">Sign Up</p>
                <div className="contents">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" id="name"></input>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" id="email"></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" id="password"></input>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" name="password2" id="password2"></input>
                    </div>
                    <button className="submit">Continue</button>
                    <p className="login-link">
                        Already have an account?
                        <Link to="/login" className="link">Log In</Link>
                        .
                    </p>
                </div>
            </div>
        )
    }
}
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Meteor } from 'meteor/meteor';

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            labelActiveEmail: '',
            labelPassword: '',
            errorMessage: ''
        }
    }

    onChangeInput(event) {
        let field = event.target.name;
        let value = event.target.value;
        let labelField = "labelActive" + field[0].toUpperCase() + field.substring(1);
        let labelValue = (value.length > 0);
        this.setState({
            [field]: value,
            [labelField]: labelValue
        });
    }

    onFocusImput(event) {
        let field = event.target.name;
        let labelField = "labelActive" + field[0].toUpperCase() + field.substring(1);
        this.setState({
            [labelField]: true
        })
    }

    onBlurInput(event) {
        let field = event.target.name;
        let value = event.target.value;
        let labelField = "labelActive" + field[0].toUpperCase() + field.substring(1);
        let labelValue = (value.length > 0);
        this.setState({
            [labelField]: labelValue
        });
    }

    onButtonSubmit() {
        let self = this;
        if (this.state.email.length === 0 && !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(this.state.email)) {
            this.setState({
                errorMessage: 'Please enter a proper email'
            })
        }else if (this.state.password.length < 6) {
            this.setState({
                errorMessage: 'Password must be of atleast 6 characters'
            });
        }else {
            this.setState({
                errorMessage: 'Saving...'
            });
            Meteor.call('user.checkUser', {
                email: this.state.email,
                password: this.state.password
            }, function(error, result) {
                if (result.code === 200) {
                    localStorage.setItem('email', self.state.email);
                    self.props.history.push('/notes');
                }else if (result.code === 401) {
                    self.setState({
                        errorMessage: "Invalid email or password"
                    });
                }else {
                    self.setState({
                        errorMessage: 'Some unexpected error occured'
                    })
                }
            })
        }
    }

    render() {
        return (
            <div className="login">
                <p className="title">Log In</p>
                <div className="contents">
                    <div className="form-group">
                        <label className={this.state.labelActiveEmail ? "active" : ""}>Email</label>
                        <input type="email" name="email" id="email" value={this.state.email} onChange={this.onChangeInput.bind(this)} onFocus={this.onFocusImput.bind(this)} onBlur={this.onBlurInput.bind(this)}></input>
                    </div>
                    <div className="form-group">
                        <label className={this.state.labelActivePassword ? "active" : ""}>Password</label>
                        <input type="password" name="password" id="password" value={this.state.password} onChange={this.onChangeInput.bind(this)} onFocus={this.onFocusImput.bind(this)} onBlur={this.onBlurInput.bind(this)}></input>
                    </div>
                    <button className="submit" type="button" onClick={this.onButtonSubmit.bind(this)}>Continue</button>
                    <p className="signup-link">
                        Don't have an account?
                        <Link to="/sign-up" className="link">Sign Up</Link>
                        .
                    </p>
                </div>
                <p className="error">{this.state.errorMessage}</p>
            </div>
        )
    }
}
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            labelActiveName: false,
            labelActiveEmail: false,
            labelActivePassword: false,
            labelActivePassword2: false,
            errorMessage: ''
        };
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

    onSubmitForm() {
        if (this.state.name.length === 0) {
            this.setState({
                errorMessage: 'Please enter a proper name'
            });
        }else if (this.state.email.length === 0 && !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(this.state.email)) {
            this.setState({
                errorMessage: 'Please enter a proper email'
            })
        }else if (this.state.password.length < 6) {
            this.setState({
                errorMessage: 'Password must be of atleast 6 characters'
            });
        }else if (this.state.password !== this.state.password2) {
            this.setState({
                errorMessage: 'Passwords do not match'
            })
        }else {
            let self = this;
            this.setState({
                errorMessage: 'Please wait...'
            });
            Meteor.call('user.insert', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }, function(error, result) {
                if (result.code === 200) {
                    localStorage.setItem('loggedIn', true);
                    self.props.history.push('/notes');
                }else if (result.code === 422) {
                    self.setState({
                        errorMessage: 'Email already exists'
                    });
                }else {
                    self.setState({
                        errorMessage: 'Something unexpected occures'
                    });
                }
            });
        }
    }

    render() {
        return (
            <div className="signup">
                <p className="title">Sign Up</p>
                <div className="contents">
                    <div className="form-group">
                        <label className={this.state.labelActiveName ? "active" : ""}>Name</label>
                        <input type="text" name="name" id="name" value={this.state.name} onChange={this.onChangeInput.bind(this)} onFocus={this.onFocusImput.bind(this)} onBlur={this.onBlurInput.bind(this)}></input>
                    </div>
                    <div className="form-group">
                        <label className={this.state.labelActiveEmail ? "active" : ""}>Email</label>
                        <input type="email" name="email" id="email" value={this.state.email} onChange={this.onChangeInput.bind(this)} onFocus={this.onFocusImput.bind(this)} onBlur={this.onBlurInput.bind(this)}></input>
                    </div>
                    <div className="form-group">
                        <label className={this.state.labelActivePassword ? "active" : ""}>Password</label>
                        <input type="password" name="password" id="password" value={this.state.password} onChange={this.onChangeInput.bind(this)} onFocus={this.onFocusImput.bind(this)} onBlur={this.onBlurInput.bind(this)}></input>
                    </div>
                    <div className="form-group">
                        <label className={this.state.labelActivePassword2 ? "active" : ""}>Confirm Password</label>
                        <input type="password" name="password2" id="password2" value={this.state.password2} onChange={this.onChangeInput.bind(this)} onFocus={this.onFocusImput.bind(this)} onBlur={this.onBlurInput.bind(this)}></input>
                    </div>
                    <button className="submit" onClick={this.onSubmitForm.bind(this)} type="button">Continue</button>
                    <p className="login-link">
                        Already have an account?
                        <Link to="/login" className="link">Log In</Link>
                        .
                    </p>
                </div>
                <p className="error">{this.state.errorMessage}</p>
            </div>
        )
    }
}
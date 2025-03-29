
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function LoginPage() {
  class LoginPage extends React.Component {
    constructor() {
      super();
      this.state = {
        input: {},
        errors: {}
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({
        input: {
          ...this.state.input,
          [event.target.name]: event.target.value
        }
      });
    }

    handleSubmit(event) {
      event.preventDefault();
      if (this.validate()) {
        console.log(this.state);
        alert("Form submitted successfully!");
        this.setState({
          input: {
            username: "",
            email: "",
            password: "",
            confirm_password: ""
          }
        });
      }
    }

    validate() {
      const { input } = this.state;
      const errors = {};
      let isValid = true;

      // Username validation
      if (!input.username?.trim()) {
        errors.username = "Username is required";
        isValid = false;
      } else if (input.username.length < 6) {
        errors.username = "Username must be at least 6 characters";
        isValid = false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!input.email) {
        errors.email = "Email is required";
        isValid = false;
      } else if (!emailRegex.test(input.email)) {
        errors.email = "Invalid email address";
        isValid = false;
      }

      // Password validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
      if (!input.password) {
        errors.password = "Password is required";
        isValid = false;
      } else if (!passwordRegex.test(input.password)) {
        errors.password = "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character";
        isValid = false;
      }

      // Confirm Password validation
      if (!input.confirm_password) {
        errors.confirm_password = "Please confirm your password";
        isValid = false;
      } else if (input.password !== input.confirm_password) {
        errors.confirm_password = "Passwords do not match";
        isValid = false;
      }

      this.setState({ errors });
      return isValid;
    }

    render() {
      const { input, errors } = this.state;
      
      return (
        <div className="LoginPage">
          <div className="container mt-5">
            <div className="card shadow col-md-6 mx-auto">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Register</h2>
                <form onSubmit={this.handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={input.username || ""}
                      onChange={this.handleChange}
                      className={`form-control ${errors.username && "is-invalid"}`}
                      placeholder="Enter username"
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={input.email || ""}
                      onChange={this.handleChange}
                      className={`form-control ${errors.email && "is-invalid"}`}
                      placeholder="Enter email"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={input.password || ""}
                      onChange={this.handleChange}
                      className={`form-control ${errors.password && "is-invalid"}`}
                      placeholder="Enter password"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      name="confirm_password"
                      value={input.confirm_password || ""}
                      onChange={this.handleChange}
                      className={`form-control ${errors.confirm_password && "is-invalid"}`}
                      placeholder="Confirm password"
                    />
                    {errors.confirm_password && <div className="invalid-feedback">{errors.confirm_password}</div>}
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return <LoginPage />;
}

export default LoginPage;
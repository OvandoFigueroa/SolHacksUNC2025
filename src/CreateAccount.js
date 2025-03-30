import React, { Component } from "react";
import PropTypes from 'prop-types';
import './Login.css';

class CreateAccount extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      input: {
        college: "",
        grade: "",
        major: "",
        username: "",
        password: "",
        confirmPassword: ""
      },
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

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validate()) {
        try {
            const response = await fetch("http://localhost:5001/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.state.input)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            alert(data.message);
            this.props.navigate('/Home');
        } catch (error) {
            alert(error.message);
        }
    }
  };

  validate() {
    const { input } = this.state;
    const errors = {};
    let isValid = true;

    if (!input.college) {
      errors.college = "College name is required";
      isValid = false;
    }

    if (!input.grade) {
      errors.grade = "Grade level is required";
      isValid = false;
    }

    if (!input.major) {
      errors.major = "Major is required";
      isValid = false;
    }

    if (!input.username) {
      errors.username = "Username is required";
      isValid = false;
    } else if (input.username.length < 6) {
      errors.username = "Username must be at least 6 characters";
      isValid = false;
    }

    if (!input.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (input.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (input.password !== input.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  }
  render() {
    const { input, errors } = this.state;
    const gradeOptions = ["", "Freshman", "Sophomore", "Junior", "Senior", "Graduate"];
    
    const formFields = [
      {
        name: "college",
        type: "text",
        placeholder: "College Name",
        error: errors.college
      },
      {
        name: "grade",
        type: "select",
        options: gradeOptions,
        placeholder: "Select Grade Level",
        error: errors.grade
      },
      {
        name: "major",
        type: "text",
        placeholder: "Major",
        error: errors.major
      },
      {
        name: "username",
        type: "text",
        placeholder: "Username",
        error: errors.username
      },
      {
        name: "password",
        type: "password",
        placeholder: "Password",
        error: errors.password
      },
      {
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm Password",
        error: errors.confirmPassword
      }
    ];

    return React.createElement('div', { className: 'login-container' },
      React.createElement('div', { className: 'login-box create-account-box' },
        React.createElement('div', { className: 'header' },
          React.createElement('h1', null, 'SOL Connections'),
          React.createElement('p', null, 'Create your account to get started')
        ),
        React.createElement('form', { onSubmit: this.handleSubmit },
          formFields.map(field => (
            React.createElement('div', { className: 'form-group', key: field.name },
              field.type === 'select' ? (
                React.createElement('select', {
                  name: field.name,
                  value: input[field.name],
                  onChange: this.handleChange,
                  className: field.error ? 'error' : ''
                },
                  React.createElement('option', { value: "" }, field.placeholder),
                  field.options.map(option => (
                    React.createElement('option', { key: option, value: option }, option)
                  ))
                )
              ) : (
                React.createElement('input', {
                  type: field.type,
                  name: field.name,
                  value: input[field.name],
                  onChange: this.handleChange,
                  placeholder: field.placeholder,
                  className: field.error ? 'error' : ''
                })
              ),
              field.error && React.createElement('div', { className: 'error-message' }, field.error)
            )
          )),
          React.createElement('button', { 
            type: 'submit', 
            className: 'login-button create-account-btn'
          }, 'Create Account'),
          React.createElement('p', { className: 'login-redirect' },
            'Already have an account? ',
            React.createElement('a', { 
              href: '#', 
              onClick: (e) => {
                e.preventDefault();
                this.props.navigate('/');
              } 
            }, 'Log in')
          )
        )
      )
    );
  }
}

export { CreateAccount };
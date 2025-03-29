import React from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginPage() {
  const navigate = useNavigate();
  const [input, setInput] = React.useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = React.useState({});

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!input.Username) {
      newErrors.Username = "Username is required";
    } else if (!emailRegex.test(input.email)) {
      newErrors.Username = "Invalid Username";
    }

    if (!input.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log(input);
      alert("Login successful!");
      setInput({ Username: "", password: "" });
    }
  };

  const formElements = [
    {
      type: "text",
      name: "Username",
      placeholder: "Username",
      error: errors.email
    },
    {
      type: "password",
      name: "password",
      placeholder: "Password",
      error: errors.password
    }
  ];

  return React.createElement('div', { className: 'login-container' },
    React.createElement('div', { className: 'login-box' },
      React.createElement('div', { className: 'header' },
        React.createElement('h1', null, 'SOL Connections'),
        React.createElement('p', null, 'Connect with friends and the world around you.')
      ),
      React.createElement('form', { onSubmit: handleSubmit },
        formElements.map((element) => 
          React.createElement('div', { className: 'form-group', key: element.name },
            React.createElement('input', {
              type: element.type,
              name: element.name,
              value: input[element.name],
              onChange: handleChange,
              placeholder: element.placeholder,
              className: element.error ? 'error' : ''
            }),
            element.error && React.createElement('div', { className: 'error-message' }, element.error)
          )
        ),
        React.createElement('button', { type: 'submit', className: 'login-button' }, 'Log In'),
        React.createElement('div', { className: 'forgot-password' },
          React.createElement('a', { 
            href: '#', 
            onClick: (e) => {
              e.preventDefault();
              navigate('/forgot-password');
            } 
          }, 'Forgotten password?')
        ),
        React.createElement('div', { className: 'divider' }),
        React.createElement('button', { 
          type: 'button', 
          className: 'create-account',
          onClick: () => navigate('/create-account')
        }, 'Create New Account')
      ),
      React.createElement('p', { className: 'create-page' },
        React.createElement('b', null, 'A site'),
        ' For Latinx in Tech who are looking for connections'
      )
    )
  );
}

export default LoginPage;
//Need to fix it from Email to only Username but will do that later...
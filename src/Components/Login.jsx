import { useState } from 'react';
import { loginFields } from '../Constants/formFields'; // Adjust the path accordingly
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from './Input';

const apiKey = 'YOUR_LOGINRADIUS_API_KEY'; // Replace with your actual LoginRadius API key

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

// Handle Login API Integration here
const authenticateUser = (loginState) => {
  const endpoint = `https://api.loginradius.com/identity/v2/auth/login?apikey=${apiKey}`;
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginState),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle API success from LoginRadius Login API
      console.log('Login successful:', data);
      // You can perform additional actions here, such as updating state or redirecting the user.
    })
    .catch((error) => console.error('Login failed:', error));
};

const Login = () => {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser(loginState);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
};

export default Login;

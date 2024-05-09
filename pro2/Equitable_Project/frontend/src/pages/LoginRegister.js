import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/transition.css";

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    
    <div className="flex min-h-screen bg-gray-100">
      <div
        className="w-4/5 bg-cover bg-center bg-gray-100"
         style={{
           backgroundImage: `url('/images/img.jpeg')`,
           boxShadow: "-4px 0 6px 0 white inset",
         }}
      ></div>
      <div className="w-2/5 flex flex-col justify-center items-center px-16 bg-yellow-50">
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <button className="mt-4 text-gray-600 hover:text-red-950 " onClick={toggleForm}>
          {isLogin ? "Need an account? Register" : "Already registered? Login"}
        </button>
      </div>
    </div>
  );
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Logging in with:", username, password);
    const user = {
      username,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/users/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        alert(errorData.error);
        navigate("/");
      } else {
        console.log('User logged in successfully!');
        localStorage.setItem("currentTab", "home");
        const userData = await response.json();
        console.log('User data:', userData);
        localStorage.setItem("token", userData.access_token);
        navigate("/home");
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }
  return (
    <form onSubmit={handleLogin} className="w-96">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Login</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-red-800 hover:bg-pink-900 text-white font-semibold p-3 rounded-md"
        >
          Login
        </button>
      </div>
    </form>
  );
}

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log("Registering with:", username, email, age);
    const user = {
      username,
      email,
      password,
      age,
    };

    try {
      const response = await fetch('http://localhost:5000/users/add', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        alert(errorData.error);
      } else {
        console.log('User registered successfully!');
        localStorage.setItem("currentTab", "home");
      }
      navigate("/");
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  return (
    <form onSubmit={handleRegister} className="w-96">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Register</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => {
            const newAge = Math.max(15, parseInt(e.target.value));
            setAge(newAge);
        }}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-red-800 hover:bg-pink-800 text-white font-semibold p-3 rounded-md "
        >
          Register
        </button>
      </div>
    </form>
  )
}
export {RegisterForm, LoginForm, LoginRegister}

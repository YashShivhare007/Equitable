import React, { useState } from "react";
import "../styles/transition.css";
function AdminHome() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState(0);

  function handleAddManeger(event) {
    event.preventDefault();
    console.log("Adding Manager with:", username, password, email, age, salary);
    // Create a user object with form data
    const manager = {
      username,
      password,
      email,
      age,
      salary,
    };

    fetch("http://localhost:5000/manager/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(manager),
    }).then((response) => {
      if (!response.ok) {
        response.json().then((errorData) => {
          console.error("Registration failed:", errorData);
        });
      } else {
        console.log("Registration successful");
        alert("Manager added successfully");
        window.location.reload();
      }
    });
  }
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className="w-3/5 bg-cover bg-center bg-gray-100"
        style={{
          backgroundImage: `url('/images/casino.webp')`,
          boxShadow: "-4px 0 6px 0 white inset",
        }}
      ></div>
      <div className="w-2/5 flex flex-col justify-center items-center px-16">
        <h1 className="text-4xl font-bold mb-4">Welcome Admin</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold p-3 rounded-md"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
        <p className="mb-4">
          You are logged in as an Admin. You Can Add New Managers
        </p>
        <form onSubmit={handleAddManeger} className="w-96">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Register
          </h2>
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
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-md"
            >
              Add Manager
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminHome;

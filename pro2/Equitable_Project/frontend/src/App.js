import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserHome from './pages/User/UserHome';
import ManagerHome from './pages/Manager/ManagerHome';
import AdminHome from './pages/AdminHome';
import {LoginRegister} from './pages/LoginRegister';
import UserAnalysis from './pages/User/userAnalysis';
import ManagerAnalysis from './pages/Manager/ManagerAnalysis';
import {jwtDecode} from "jwt-decode";


function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/home" element={userRole === 'admin' ? <AdminHome /> : userRole === 'manager' ? <ManagerHome /> : <UserHome />} />
        <Route path="/analytics" element={userRole === 'manager' ? <ManagerAnalysis />:<UserAnalysis />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
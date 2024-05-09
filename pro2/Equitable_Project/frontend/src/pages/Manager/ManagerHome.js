import React from "react";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DragDropImage from "../../components/DragDropImage";


function ManagerHome() {
  const [currentTab, setCurrentTab] = useState("home");
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center", fontWeight: "bold", background: "linear-gradient(to right, #ff9966, #ff5e62)" }}>Welcome Manager</h1>
      <DragDropImage/>
    </div>
  );
}

export default ManagerHome;

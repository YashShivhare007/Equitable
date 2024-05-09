import React from "react";
import Navbar from "../../components/Navbar";
import DragDropImage from "../../components/DragDropImage";
function UserHome() {
  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center", fontWeight: "bold", color: "rgb(#AF40FF,#5B42F3,#00DDEB)", fontFamily:"monospace",marginTop:"10px", fontSize:"1.3rem"}}>WELCOME USER</h1>
      <DragDropImage/>
    </div>
  );
}
export default UserHome;

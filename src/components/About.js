import React from "react";
import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";

function About() {
  return(
      <div className="w-full h-48 flex flex-initial justify-center">
          This is the about
      </div>
  );
}
  
function Body(){
  return (
    <>
      <NavBar/>
      <About/>
    </>
  );
};
  
export default Body;
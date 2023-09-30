import React from "react";
import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";

function Thanks() {
    return(
        <div className="w-full h-48 flex flex-initial justify-center">
            <p>https://hypercolor.dev/</p>
        </div>
    );
}
  
function About(){
  return (
    <>
      <NavBar/>
      <Thanks/>
    </>
  );
};
  
export default About;
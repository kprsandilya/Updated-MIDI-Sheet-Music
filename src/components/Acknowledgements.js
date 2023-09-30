import React from "react";
import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";

function Acknowledgements() {
    return(
        <div className="w-full h-48 flex flex-initial justify-center">
            <p>https://hypercolor.dev/</p>
        </div>
    );
}
  
function Body(){
  return (
    <>
      <NavBar/>
      <Acknowledgements/>
    </>
  );
};
  
export default Body;
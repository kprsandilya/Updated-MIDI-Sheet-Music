import React from "react";
import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";

function Application() {
    return(
        <div className="w-full h-48 flex flex-initial justify-center">
            This is the application
        </div>
    );
}
  
function Body(){
  return (
    <>
      <NavBar/>
      <Application/>
    </>
  );
};
  
export default Body;
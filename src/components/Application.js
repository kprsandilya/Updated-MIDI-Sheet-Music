import React from "react";
import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";

function Application() {
    return(
        <div className="w-full h-1/2 flex flex-initial justify-center">
            
        </div>
    );
}
  
function Body(){
  return (
    <>
      <NavBar/>
      <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r pb-12">
        <Application/>
        <Footer/>
      </div>
    </>
  );
};
  
export default Body;
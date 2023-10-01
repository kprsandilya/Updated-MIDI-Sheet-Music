import React from "react";
import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";

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
      <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r pb-12">
        <About/>
        <Footer/>
      </div>
    </>
  );
};
  
export default Body;
import React from "react";
import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";
import HeroPattern from "./HeroPattern.js";

function About() {
  return(
    <div className="flex flex-row">
    <div className="w-1/6"></div>
    <div className="text-slate-600 w-2/3">
      <div className="h-8"></div>
      <HeroPattern pttrn={'morphing-diamonds'}>
        <div className="flex flex-col space-y-4">
          <div className="w-full h-96 flex flex-initial justify-center pt-44">
            <p>This is the about</p>  
          </div>
        </div>
      </HeroPattern>
      </div>
    <div className="w-1/6"></div>
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
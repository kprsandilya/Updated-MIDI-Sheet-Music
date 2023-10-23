import React from "react";
import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";
import HeroPattern from "./HeroPattern.js";

function Acknowledgements() {
    return(
    <div className="flex flex-row">
      <div className="w-1/6"></div>
      <div className="text-slate-600 w-2/3">
        <div className="h-8"></div>
        <HeroPattern pttrn={'temple'}>
          <div className="flex flex-col space-y-4">
            <div className="w-full h-20 flex flex-initial justify-center pt-8">
              <p>https://hypercolor.dev/</p>  
            </div>
            <div className="w-full h-20 flex flex-initial justify-center pt-8">
              <p>https://heropatterns.com/</p>
            </div>
            <div className="w-full h-20 flex flex-initial justify-center pt-8">
              <p>https://tonejs.github.io/Midi/</p>
            </div>
            <div className="w-full h-28 flex flex-initial justify-center pt-8">
              <p>https://magenta.github.io/magenta-js/music/</p>
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
        <Acknowledgements/>
        <Footer/>
      </div>
    </>
  );
};
  
export default Body;
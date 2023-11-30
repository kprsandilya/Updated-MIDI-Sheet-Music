import React from "react";
import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";
import HeroPattern from "./HeroPattern.js";
import MIDILogo from "../Harp MIDI Logo.svg";

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

function TailWindAcknowledgements() {
  return (
    <>
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute"></div>
        <div className="absolute shadow-xl shadow-indigo-600/10 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl flex items-center flex-col">
          <div className="w-1/3 text-indigo-600 flex flex-row">
            <div className="w-1/6"></div>
            <img className="mx-auto h-12 w-1/6" src={MIDILogo} alt=""></img>
            <p className="pt-3 font-bold items-start w-6/12">MIDI Sheet Music</p>
            <div className="w-1/6"></div>
          </div>
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-200 sm:text-2xl sm:leading-9">
              <p>Thank You for Using This Application</p>
            </blockquote>
            <figcaption className="mt-10">
              <img className="mx-auto h-10 w-10 rounded-full border-2 border-black" src={MIDILogo} alt=""/>
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-300">Sandilya Kambhampati</div>
                <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" className="fill-gray-900">
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <div className="text-gray-400">Creator of the Website</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      <div className="py-24 sm:py-32 bg-slate-500/5 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col">
          <h2 className="text-center text-2xl font-semibold leading-8 text-gray-200">With great help from these sources</h2>
          <div className="flex items-center justify-center pt-12 space-x-24 flex-row">
            <a className="max-h-12 object-contain text-2xl text-slate-400 border-2" href="https://heropatterns.com/"> HeroPatterns</a>
            <a className="max-h-12 object-contain text-2xl text-slate-400 border-2" href="https://hypercolor.dev/"> HyperColor</a>
            <a className="max-h-12 object-contain text-2xl text-slate-400 border-2" href="https://tonejs.github.io/Midi/"> ToneJS</a>
            <a className="max-h-12 object-contain text-2xl text-slate-400 border-2" href="https://magenta.github.io/magenta-js/music/"> MagentaJS</a>
            <a className="max-h-12 object-contain text-2xl text-slate-400 border-2" href="https://firebase.google.com/"> FireBase</a>
            <a className="max-h-12 object-contain text-2xl text-slate-400 border-2" href="https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/"> FreeCodeCamp</a>
          </div>
          <div className="flex items-center justify-center pt-12 space-x-24 flex-row">
            <a className="max-h-12 object-contain text-2xl text-slate-400 border-2" href="https://chat.openai.com/"> ChatGPT</a>
            <a className="max-h-12 object-contain text-2xl text-slate-400 border-2" href="https://www.robinwieruch.de/react-dropdown/"> rw;eruh</a>
            <a className="max-h-12 object-contain text-2xl text-slate-400 border-2" href="https://tonejs.github.io/Midi/"> ToneJS</a>
            <a className="max-h-12 object-contain text-2xl text-slate-400 border-2" href="https://magenta.github.io/magenta-js/music/"> MagentaJS</a>
            <a className="max-h-12 object-contain text-2xl text-slate-400 border-2" href="https://firebase.google.com/"> FireBase</a>
          </div>
        </div>
      </div>
    </>

  );
}
  
function Body(){
  return (
    <>
      <NavBar/>
      <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r pb-12">
        <TailWindAcknowledgements/>
        <Footer/>
      </div>
    </>
  );
};
  
export default Body;
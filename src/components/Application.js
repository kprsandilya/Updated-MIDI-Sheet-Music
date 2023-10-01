import React from "react";
import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";
import * as Tone from 'tone';
const { Midi } = require('@tonejs/midi');
const synth = new Tone.Synth().toDestination();

//Upload a MIDI Track
//Visualize a MIDI Track
//  User Chooses from tracks on screen
//  Software determines compatability

/*1) Figuring out uploading a midi track to the page, we can work with one file for now, and worry about firebase or some database later
2) After uploading, we want to visualize the midi track and user can select the tracks that are compatible with converting to sheet music*/

//This week
//Upload Midi and display its json on screen
//Button for audio

function AudioButton() {
  function audio() {
    synth.triggerAttackRelease("C4", "8n");
  }
  return(
    <button onClick={audio}>
      Play sound!
    </button>
  );
}

function Application() {
    return(
        <div className="w-full h-1/2 flex flex-initial justify-center">
            <AudioButton/>
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
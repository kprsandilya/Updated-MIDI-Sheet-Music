import React from "react";
import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";
import HeroPattern from "./HeroPattern.js";
import { useState } from 'react';
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

function FileUploadPage(){
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
    console.log(selectedFile);
	};

	return(
   <div className="flex flex-row">
			<input type="file" name="file" accept='.midi, .mid' onChange={changeHandler}/>
			{isSelected ? (
				<div className=""></div>
			) : (
				<p></p>
			)}
			<div className=" pl-8 pt-[3px]">
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
}

function Application() {
  return(
    <div className="flex flex-row">
      <div className="w-1/6"></div>
      <div className="text-slate-600 w-2/3">
        <div className="h-8"></div>
        <HeroPattern pttrn={'topography-pattern'}>
          <div className="w-full h-24 pt-12 flex flex-initial justify-center">
            <h1 className="text-xl">React File Upload</h1>
          </div>
          <div className="w-full h-24 flex flex-initial justify-center">
            <FileUploadPage/>
          </div>
        </HeroPattern>
        <div className="w-full h-64 flex flex-initial justify-center">
        </div>
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
        <Application/>
        <Footer/>
      </div>
    </>
  );
};
  
export default Body;
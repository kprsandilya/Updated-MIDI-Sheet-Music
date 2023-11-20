import React from "react";
import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";
import { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import * as mm from '@magenta/music';
import MidiVisualizerComponent from "./staff_index.js";
const { Midi } = require('@tonejs/midi');

var totalJSON;
var totalSynths = [];
var indSynths = [];

//This week
//UI stuff
  //Footer
  //Navbar
  //Home Page
  //User Page
//UI Libraries
  //Mantine/Tailwind

function TotalPlay({currentMidi, noPlay}) {
  function handleClick() {
    if (noPlay === 0 && currentMidi) {
      noPlay = 1;
      const now = Tone.now() + 0.5;
      currentMidi.tracks.forEach((track) => {
        //create a synth for each track
        const synth = new Tone.PolySynth(Tone.Synth, {
          envelope: {
            attack: 0.02,
            decay: 0.1,
            sustain: 0.3,
            release: 1,
          },
        }).toDestination();
        totalSynths.push(synth);
        //schedule all of the events
        track.notes.forEach((note) => {
          synth.triggerAttackRelease(
            note.name,
            note.duration,
            note.time + now,
            note.velocity
          );
        });
      });
    } else {
      noPlay = 0;
      //dispose the synth and make a new one
      while (totalSynths.length) {
        const synth = totalSynths.shift();
        synth.disconnect();
      }
    }
  }
  
  return(
    <div className="flex flex-row">
        <div className="justify-center pt-1">
          <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 w-20 h-10 text-white font-bold py-2 px-4 rounded">Play</button>
        </div>
      </div>
    )
}

function PlaySound({currentMidi, noPlay}) {
  const synths = [];
  function handleClick() {
    if (noPlay === 0 && currentMidi) {
      noPlay = 1;
      const now = Tone.now() + 0.5;
      //create a synth for each track
      const synth = new Tone.PolySynth(Tone.Synth, {
        envelope: {
          attack: 0.02,
          decay: 0.1,
          sustain: 0.3,
          release: 1,
        },
      }).toDestination();
      synths.push(synth);
      //schedule all of the events
      currentMidi.notes.forEach((note) => {
        synth.triggerAttackRelease(
          note.name,
          note.duration,
          note.time + now,
          note.velocity
        );
      });
      indSynths.push(synths);
    } else {
      noPlay = 0;
      //dispose the synth and make a new one
      while (synths.length) {
        const synth = synths.shift();
        synth.disconnect();
      }
    }
  }

  return(
    <button onClick={handleClick} className="w-12 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play</button>
   )
}

function FileUploadPage({ selectedFile, setSelectedFile, setFileJSON, fileJSON, setNoteSequences, noteSequences }){

  const [showResults, setShowResults] = React.useState(false);
  const [file, setFile] = React.useState(0);

	const changeHandler = (event) => {
    // if (selectedFile == null) {
    //   setSelectedFile(event.target.files[0]);
    // } else {
    //   window.location.reload();
    // }
    setSelectedFile(event.target.files[0]);
	};

  const handleFileChange = async (event) => {
    console.log(selectedFile);
    if (selectedFile) {
      setShowResults(true);
      const reader = new FileReader();
      reader.onload = () => {
        const midi = new Midi(reader.result);
        totalJSON = new Midi(reader.result);
        const midiTracks = [];
        for (var i = 0; i < midi.tracks.length; i++) {
          midi.header.index = i;
          const mergedObject = {
            ...midi.header,
            ...midi.header.index,
            ...midi.tracks[i]
          };
          midiTracks.push(mergedObject);
        }
        setFileJSON(midiTracks);
      };
      reader.readAsArrayBuffer(selectedFile);
    } else {
      setShowResults(false);
      setFileJSON(undefined);
      while (totalSynths.length) {
        const synth = totalSynths.shift();
        synth.disconnect();
      }
      for (var i = 0; i < indSynths.length; i++) {
        while (indSynths[i].length) {
          const synth = indSynths[i].shift();
          synth.disconnect();
        }
      }
    }
  };
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [outputNoteSequences, setOutputNoteSequences] = useState(null);

  useEffect(() => {
    function fetchAndParseMIDIFile() {
      try {
        if (fileJSON != null) {
          setNoteSequences(() => {
            const newNoteSequences = [];
            fileJSON.forEach((track) => {
              const parsedNoteSequence = parseMidiToNoteSequence(track);
              newNoteSequences.push(parsedNoteSequence);
            });
            return newNoteSequences;
          });
  
          // Update state to stop loading
          setLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error);
        setLoading(false);
      }
    }
  
    fetchAndParseMIDIFile();
  }, [fileJSON]);

  const parseMidiToNoteSequence = (track) => {
    const noteSequence = new mm.NoteSequence();
    const { header } = track;
    var ticksPerQuarter = 4;
    // if (header.ticksPerBeat != null) {
    //   ticksPerQuarter = header.ticksPerBeat;
    // }
    const quarterToSixteenth = 4;

    noteSequence.quantizationInfo = {
      stepsPerQuarter: 4,
      qpm: 120,
    };

    let currentTime = 0;
    track.notes.forEach((note) => {
      const pitch = note.midi;
      const startTime = (note.ticks / ticksPerQuarter) * quarterToSixteenth / 960;
      const duration = (note.durationTicks / ticksPerQuarter) * quarterToSixteenth / 960;
      noteSequence.notes.push({
        pitch,
        startTime,
        endTime: startTime + duration,
        velocity: note.velocity,
      });
      currentTime = Math.max(currentTime, startTime + duration);
    });
    noteSequence.totalTime = Math.max(noteSequence.totalTime, currentTime);

    noteSequence.totalQuantizedSteps = Math.floor(
      (noteSequence.totalTime / 60) * noteSequence.quantizationInfo.stepsPerQuarter
    );
    let tempo;
    if (track.tempos[0].bpm != null) {
      tempo = Math.floor(track.tempos[0].bpm);
    } else {
      tempo = 120;
    }
    const outputNoteSequence = {
      notes: noteSequence.notes.map((note) => ({
        pitch: note.pitch,
        startTime: note.startTime,
        endTime: note.endTime,
        program: 0, // Assuming default program is 0
        velocity: note.velocity,
      })),
      tempos: [{ time: 0, qpm: tempo}], // Assuming default qpm is 120
      keySignatures: [{ time: 0, key: 0 }], // Assuming default key is C major
      timeSignatures: [{ time: 0, numerator: 4, denominator: 4 }], // Assuming default time signature is 4/4
      totalTime: noteSequence.totalTime,
    };
    return outputNoteSequence;
  };

  return(
    <div class="flex flex-col items-center justify-center w-full">
        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">.MIDI or .MID</p>
            </div>
            <input id="dropzone-file" type="file" name="file" accept='.midi, .mid' class="hidden" onChange={changeHandler} />
        </label>
       { showResults ? 
          <div className="flex flex-row w-full pt-4">
          <div className="w-1/3"></div>
          <div className="w-1/6 justify-end pt-1">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24 h-10" onClick={handleFileChange}>Submit</button>
          </div>
          <div className="w-1/6 flex justify-end">
            <TotalPlay currentMidi={totalJSON} noPlay={0} className="pt-24"></TotalPlay>
          </div>
          <div className="w-1/3"></div>
        </div>
          : <div className="pt-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24 h-10" onClick={handleFileChange}>Submit</button>
            </div> }
    </div> 
	)
}

function ReturnDivs({fileJSON, selectedFile, noteSequences}) {
  const generateKey = (pre) => {
    //console.log(fileJSON);
    //console.log(`${ pre }_${ new Date().getTime() }`);
    return `${ pre }_${ new Date().getTime() }_${Math.random()}`;
  }
  var listItems = (
    <div>
      <div className="w-full h-16 flex flex-initial justify-center"></div>
      <div className="w-full h-96 flex flex-initial justify-center overflow-auto text-white">
        <pre className="w-full flex flex-initial"></pre>
      </div>
    </div>
  );
  if (fileJSON !== undefined) {
    listItems = fileJSON.map((track) =>
      <div key={generateKey(track.channel)}>
        <div  className="w-full h-16 flex flex-initial justify-center"></div>
        <div className="w-full h-96 flex flex-initial justify-center overflow-auto text-white">
          <MidiVisualizerComponent noteSequences={noteSequences} number={track.index}/>
        </div>
      </div>
    );
  }

  return (
    <div>
      {listItems}
    </div>
  );
};

function Application({ selectedFile, setSelectedFile, fileJSON, setFileJSON }) {
  const [noteSequences, setNoteSequences] = useState([]);
  return(
    <div className="flex flex-row">
      <div className="w-1/6"></div>
      <div className="text-slate-600 w-2/3">
        <div className="h-8"></div>
        <div className="w-full h-64 flex flex-initial justify-center">
            <FileUploadPage selectedFile={selectedFile} setSelectedFile={setSelectedFile} setFileJSON={setFileJSON} fileJSON={fileJSON}
            noteSequences={noteSequences} setNoteSequences={setNoteSequences}/>
          </div>
        <ReturnDivs fileJSON={fileJSON} selectedFile={selectedFile} noteSequences={noteSequences} setNoteSequences={setNoteSequences}/>
      </div>
      <div className="w-1/6"></div>
    </div>
  );
}
  
function Body(){
  const [selectedFile, setSelectedFile] = useState();
  const [fileJSON, setFileJSON] = useState();
  return (
    <>
      <NavBar/>
      <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r pb-12">
        <Application selectedFile={selectedFile} setSelectedFile={setSelectedFile} fileJSON={fileJSON} setFileJSON={setFileJSON}/>
        <Footer/>
      </div>
    </>
  );
};
  
export default Body;
import React from "react";
import '../App.css';
import "../input.css";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";
import HeroPattern from "./HeroPattern.js";
import { useState, useEffect } from 'react';
import * as Tone from 'tone';
import * as mm from '@magenta/music';
import MidiVisualizerComponent from "./staff_index.js";
const { Midi } = require('@tonejs/midi');

var totalJSON;
var totalSynths = [];
var indSynths = [];

//Fix the file change

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
          <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded">Play</button>
        </div>
      </div>
    )
}

function Application() {
    
    const [selectedFile, setSelectedFile] = useState();
    const [fileJSON, setFileJSON] = useState([]);
    const [noteSequences, setNoteSequences] = useState([]);
    const [showResults, setShowResults] = React.useState(false);
    const changeHandler = (event) => {
      setSelectedFile(event.target.files[0]);
    };

    async function getMidiTracks() {
      console.log("asdfasdf");
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
          console.log(midiTracks);
          return midiTracks;
        };
        reader.readAsArrayBuffer(selectedFile);
      } else {
        setShowResults(false);
        setFileJSON([]);
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
    }

  const handleFileChange = async (event) => {
    const midiTracks = await getMidiTracks();
    console.log(midiTracks);
    setFileJSON(midiTracks);

    if (fileJSON && fileJSON.length !== 0) {
      console.log("fileJSON changed");
      const newNoteSequences = [];
      console.log(fileJSON);
      fileJSON.forEach((track) => {
        const parsedNoteSequence = parseMidiToNoteSequence(track);
        console.log(parsedNoteSequence)
        newNoteSequences.push(parsedNoteSequence);
      })
      console.log(newNoteSequences);
      setNoteSequences(newNoteSequences);
      
    } 
  };

  const [error, setError] = useState(null);

  const parseMidiToNoteSequence = (track) => {
    console.log(track)
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
  const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }_${Math.random()}`;
  }
//   const listItems = (
//     <div>
//       <div className="w-full h-16 flex flex-initial justify-center"></div>
//       <div className="w-full h-96 flex flex-initial justify-center overflow-auto text-white">
//         <pre className="w-full flex flex-initial"></pre>
//       </div>
//     </div>
//   );
//   if (fileJSON !== undefined) {
//     listItems = fileJSON.map((track) =>
//       <div key={generateKey(track.channel)}>
//         <div  className="w-full h-16 flex flex-initial justify-center"></div>
//         <div className="w-full h-96 flex flex-initial justify-center overflow-auto text-white">
//           <MidiVisualizerComponent noteSequences={noteSequences} number={track.index}/>
//         </div>
//       </div>
//     );
//   }
  // useEffect(() => {
  //   console.log(fileJSON);
  //   console.log(noteSequences);
  //   console.log("file changed");
  // }, [noteSequences]);
  return(
    <div className="flex flex-row">
      <div className="w-1/6"></div>
      <div className="text-slate-600 w-2/3">
        <div className="h-8"></div>
        <HeroPattern pttrn={'topography-pattern'}>
                <div className="w-full h-24 pt-12 flex flex-initial justify-center">
                    <h1 className="text-xl">React File Upload</h1>
                </div>
                <div className="w-full h-8 flex flex-initial justify-center">
                <div className="flex flex-col">
            <div className="flex flex-row">
                <input type="file" name="file" accept='.midi, .mid' onChange={changeHandler}/>
                <div className="h-8 pl-8 pt-[3px]">
                <button onClick={handleFileChange}>Submit</button>
                </div>
            </div>
            <div className="flex flex-row w-full">
                <div className="w-5/12"></div>
                <div className="w-1/6">
                { showResults ? <TotalPlay currentMidi={totalJSON} noPlay={0}></TotalPlay> : null }
                </div>
                <div className="w-5/12"></div>
            </div>
            </div>
          </div>
          <div className="h-16"></div>
        </HeroPattern>
        <div>
            <div>
                {fileJSON && <p>fileJSON</p>}
                {noteSequences && <p>notes</p>}
                {fileJSON && noteSequences && fileJSON.map((track) => (
                    <div key={generateKey(track.channel)}>
                        <div className="w-full h-16 flex flex-initial justify-center"></div>
                        <div className="w-full h-96 flex flex-initial justify-center overflow-auto text-white">
                            <MidiVisualizerComponent noteSequences={noteSequences} number={track.index} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
      <div className="w-1/6"></div>
    </div>
  );
}
  
function Body(){
  return (
    <>
      {/* <NavBar/> */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r pb-12">
        <Application/>
        {/* <Footer/> */}
      </div>
    </>
  );
};
  
export default Body;
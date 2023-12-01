import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import * as mm from '@magenta/music';
import * as ssv from './staff_svg_visualizer.ts'; // Import your staff_svg_visualizer module
import { saveAs } from 'file-saver';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection,  updateDoc } from "@firebase/firestore";
import { firestore, storage } from '../firebase_setup/firebase';
import { auth } from '../firebase_setup/firebase';
import SvgParser from "./svgParser.js";

const DownloadSVG = ({ svgContent, fileName }) => {
  const [user, setUser] = useState(auth.currentUser);
  const handleDownload = () => {
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    var name = fileName + ".svg";
    saveAs(svgBlob, name || 'image.svg');
  };

  useEffect(() => {
    setUser(auth.currentUser)
    
  }, [user]);

  async function handleSVG(user, file) {
    try {
      if (!user || !file) {
        console.error('User or file is not available.');
        return;
      }
  
      // Upload the SVG file to storage
      const storageRef = ref(storage, `svgFiles/${user.uid}/${fileName + ".svg"}`);
      await uploadBytes(storageRef, file);
  
      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(storageRef);
  
      // Save metadata to Firestore
      const svgFilesRef = collection(firestore, 'users', user.uid, 'svgFiles');
      const newSVGFileRef = await addDoc(svgFilesRef, {
        fileName: fileName + ".svg",
        fileUrl: downloadURL,
        // Add other metadata if needed
      });

      // Step 2: Update the document with the generated ID
      await updateDoc(newSVGFileRef, { id: newSVGFileRef.id });
  
      console.log('SVG file uploaded successfully:', newSVGFileRef.id);
    } catch (error) {
      console.error('Error uploading SVG file:', error);
    }
  }

  async function handlePDF(user, file) {
    try {
      if (!user || !file) {
        console.error('User or file is not available.');
        return;
      }
  
      // Upload the MIDI file to storage
      const storageRef = ref(storage, `pdfFiles/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
  
      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(storageRef);
  
      // Save metadata to Firestore
      const pdfFilesRef = collection(firestore, 'users', user.uid, 'pdfFiles');
      const newPDFFileRef = await addDoc(pdfFilesRef, {
        fileName: file.name,
        fileUrl: downloadURL,
        // Add other metadata if needed
      });
  
      console.log('PDF file uploaded successfully:', newPDFFileRef.id);
    } catch (error) {
      console.error('Error uploading PDF file:', error);
    }
  }

  function throwError() {
    window.alert("Currently Disabled!");
  }

  return (
    <>
      <div className="text-sm flex items-center text-cyan-600 underline underline-offset-2">
        <button onClick={handleDownload}>Download SVG</button>
        <br/>
        <button onClick={() => handleSVG(user, new Blob([svgContent], { type: 'image/svg+xml' }))}>Save SVG</button>
      </div>
      <div className="text-sm flex items-center text-cyan-600 underline underline-offset-2">
        <SvgParser svgpic={svgContent}/>
        <br/>
        {/* <button onClick={() => handlePDF(user, )}>Save PDF</button> */}
        <button onClick={throwError}>Save PDF</button>
      </div>
    </>
  );
};

const MidiVisualizerComponent = ({ noteSequences, number, fileName }) => {
  const staffRightRef = useRef(null);
  const playerRef = useRef(null);
  const gainNodeRef = useRef(null); // Ref for the GainNode
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [svg, setSVG] = useState(null);
  const [tempo, setTempo] = useState(120); // Initial tempo value is set to 120 BPM
  const parsedNoteSequence = noteSequences[number];

  useEffect(() => {
    if (parsedNoteSequence) {
      const configRight = {
        noteHeight: 15,
        pixelsPerTimeStep: 0,
        noteRGB: '255,255,255, 1',
        activeNoteRGB: '255,0,0, 1',
        instruments: [0],
        defaultKey: 7,
        scrollType: ssv.ScrollType.BAR
      };

      const visualizerRight = new ssv.StaffSVGVisualizer(
        parsedNoteSequence,
        staffRightRef.current,
        configRight
      );

    // Serialize the SVG element to a string
    const svgString = new XMLSerializer().serializeToString(visualizerRight.render.staffSVG);

    // Change stroke color to black in the SVG string
    const updatedSvgString = svgString.replace(/stroke=["'](?:rgba?\(\d{1,3},\s?\d{1,3},\s?\d{1,3}(?:,\s?[.\d]+)?\)|#[0-9a-fA-F]+|white)["']/g, 'stroke="black"');
    const up2SvgString = updatedSvgString.replace(/fill=["'](?:rgba?\(\d{1,3},\s?\d{1,3},\s?\d{1,3}(?:,\s?[.\d]+)?\)|#[0-9a-fA-F]+|white)["']/g, 'fill="black"');

    setSVG(up2SvgString);

      const player = new mm.Player(false, {
        run: (note) => {
          visualizerRight.redraw(note, true);
        },
        stop: () => {
          setIsPlaying(false);
          setIsPaused(false);
        }
      });

      playerRef.current = player;

      console.log(player);

      // Set initial tempo
      const initialTempo = parsedNoteSequence.tempos[0].qpm;
      player.setTempo(initialTempo);

      // Create an audio context
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Create a GainNode for volume control
      const gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination); // Connect to the speakers

      gainNodeRef.current = gainNode; // Save the GainNode in the ref

      player.polySynth.options.volume = 50;
      player.polySynth.output._unmutedVolume = 50;
      // Cleanup when component unmounts
      return () => {
        player.stop();
      };
    }
  }, [noteSequences]);

  const handlePlay = () => {
    const player = playerRef.current;
    const gainNode = gainNodeRef.current;
    if (player && gainNode) {
        // Set the desired volume level (from 0 to 1)
        gainNode.gain.value = 1; // Adjust the volume here (0.5 means 50% volume)

        const player = playerRef.current;
      if (player) {
        if (isPaused) {
          player.resume(parsedNoteSequence);
          setIsPlaying(true);
          setIsPaused(false);
        } else {
          try {
            player.start(parsedNoteSequence);
            setIsPlaying(true);
            setIsPaused(false);
          } catch (err) {
            console.log(err);
            window.alert('Stop one track before starting another!');
          }
        }
      }
    }
  };

  const handlePause = () => {
    const player = playerRef.current;
    if (player) {
      player.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    const player = playerRef.current;
    if (player) {
      player.stop();
      setIsPlaying(false);
      setIsPaused(false);
      Tone.Transport.stop();
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setTempo(tempo);
    }
  }, [tempo]);

  return (
    
    <div className="overflow-auto w-full flex flex-col space-y-4">
      <input type="range" min="40" max="240" step="1" value={tempo} onChange={(e) => setTempo(parseInt(e.target.value, 10))}className="w-full"/>
      <span className="text-center">{tempo} BPM</span>
      <div ref={staffRightRef}></div>
      <div className="flex flex-row space-x-8">
        <div className="flex flex-row w-1/4">
            <div className="w-1/6"></div>
            <div className="w-2/3">
            <button onClick={handlePlay} disabled={isPlaying} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play</button>
            </div>
            <div className="w-1/6"></div>
        </div>
        <div className="flex flex-row w-1/4">
            <div className="w-1/6"></div>
            <div className="w-2/3">
            <button onClick={handlePause} disabled={!isPlaying} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Pause</button>
            </div>
            <div className="w-1/6"></div>
        </div>
        <div className="flex flex-row w-1/4">
            <div className="w-1/6"></div>
            <div className="w-2/3">
            <button onClick={handleStop} disabled={!isPlaying} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Stop</button>
            </div>
            <div className="w-1/6"></div>
        </div>
        <DownloadSVG className="w-1/4" svgContent={svg} fileName={fileName}/>
      </div>
    </div>
  );
};

export default MidiVisualizerComponent;
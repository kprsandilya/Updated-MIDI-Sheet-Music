import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import * as mm from '@magenta/music';
import * as ssv from './staff_svg_visualizer.ts'; // Import your staff_svg_visualizer module
import { saveAs } from 'file-saver';
import { PDFDownloadLink, Document, Page, Image, Text } from '@react-pdf/renderer';
import SvgParser from "./svgParser.js";

const DownloadSVG = ({ svgContent, fileName }) => {
  const handleDownload = () => {
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    saveAs(svgBlob, fileName || 'image.svg');
  };

  return (
    <div>
      <button onClick={handleDownload}>Download SVG</button>
      <SvgParser svgpic={svgContent}/>
    </div>
  );
};

const MidiVisualizerComponent = ({ noteSequences, number }) => {
  const staffRightRef = useRef(null);
  const playerRef = useRef(null);
  const gainNodeRef = useRef(null); // Ref for the GainNode
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
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
          setIsStopped(false);
        } else {
          try {
            player.start(parsedNoteSequence);
            setIsPlaying(true);
            setIsPaused(false);
            setIsStopped(true);
          } catch (err) {
            console.log(err);
            //window.location.reload();
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
      setIsStopped(true);
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
        <div className="flex flex-row w-1/3">
            <div className="w-1/6"></div>
            <div className="w-2/3">
            <button onClick={handlePlay} disabled={isPlaying} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play</button>
            </div>
            <div className="w-1/6"></div>
        </div>
        <div className="flex flex-row w-1/3">
            <div className="w-1/6"></div>
            <div className="w-2/3">
            <button onClick={handlePause} disabled={!isPlaying} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Pause</button>
            </div>
            <div className="w-1/6"></div>
        </div>
        <div className="flex flex-row w-1/3">
            <div className="w-1/6"></div>
            <div className="w-2/3">
            <button onClick={handleStop} disabled={!isPlaying} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Stop</button>
            </div>
            <div className="w-1/6"></div>
        </div>
        <DownloadSVG svgContent={svg}/>
      </div>
    </div>
  );
};

export default MidiVisualizerComponent;
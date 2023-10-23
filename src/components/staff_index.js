import React, { useEffect, useRef, useState } from 'react';
import * as mm from '@magenta/music';
import * as ssv from './staff_svg_visualizer.ts'; // Import your staff_svg_visualizer module

const MidiVisualizerComponent = ({ noteSequences, number }) => {
  const staffRightRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const parsedNoteSequence = noteSequences[number];

  useEffect(() => {
    if (parsedNoteSequence) {
      const configRight = {
        noteHeight: 15,
        pixelsPerTimeStep: 0,
        instruments: [0],
        defaultKey: 7,
        scrollType: ssv.ScrollType.BAR
      };

      const visualizerRight = new ssv.StaffSVGVisualizer(
        parsedNoteSequence,
        staffRightRef.current,
        configRight
      );

      const player = new mm.Player(false, {
        run: (note) => {
          visualizerRight.redraw(note, true);
        },
        stop: () => {
          setIsPlaying(false);
        }
      });

      playerRef.current = player;

      // Set initial tempo
      const initialTempo = parsedNoteSequence.tempos[0].qpm;
      player.setTempo(initialTempo);

      // Cleanup when component unmounts
      return () => {
        player.stop();
      };
    }
  }, [noteSequences]);

  const handlePlay = () => {
    const player = playerRef.current;
    if (player) {
      if (isPaused) {
        player.resume(parsedNoteSequence);
        setIsPlaying(true);
        setIsPaused(false);
      } else {
        player.start(parsedNoteSequence);
        setIsPlaying(true);
        setIsPaused(false);
      }
    }
  };

  const handlePause = () => {
    const player = playerRef.current;
    if (player) {
      player.pause();
      setIsPlaying(false);
      setIsPaused(true)
    }
  };

  const handleStop = () => {
    const player = playerRef.current;
    if (player) {
      player.stop();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  return (
    <div className="overflow-auto w-full flex flex-col space-y-4">
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
      </div>
    </div>
  );
};

export default MidiVisualizerComponent;
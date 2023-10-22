import React, { useEffect, useRef, useState } from 'react';
import * as mm from '@magenta/music';
import * as ssv from './staff_svg_visualizer.ts'; // Import your staff_svg_visualizer module

const MidiVisualizerComponent = ({ noteSequences, number }) => {
  const staffRightRef = useRef(null);
  

  const STAFF_USE_CASES = {
    notes: [
      {pitch: 65, startTime: 3, endTime: 4, program: 0, velocity: 128},
      {pitch: 65, startTime: 4, endTime: 8, program: 0, velocity: 128},
      {pitch: 65, startTime: 12, endTime: 14, program: 0, velocity: 112},
      {pitch: 65, startTime: 16, endTime: 17, program: 0, velocity: 96},
      {pitch: 65, startTime: 18, endTime: 18.5, program: 0, velocity: 80},
      {pitch: 65, startTime: 19, endTime: 19.25, program: 0, velocity: 64},
      {pitch: 65, startTime: 19.5, endTime: 19.625, program: 0, velocity: 48},
      {pitch: 65, startTime: 19.75, endTime: 19.8125, program: 0, velocity: 32},
      {pitch: 77, startTime: 19.875, endTime: 20.0625, program: 0},
      {pitch: 65, startTime: 24, endTime: 26, program: 0},
      {pitch: 77, startTime: 25, endTime: 27, program: 0},
      {pitch: 65, startTime: 29, endTime: 29.5, program: 0},
      {pitch: 66, startTime: 29.5, endTime: 30, program: 0},
      {pitch: 66, startTime: 30, endTime: 30.5, program: 0},
      {pitch: 65, startTime: 30.5, endTime: 31, program: 0},
      {pitch: 65, startTime: 31, endTime: 31.5, program: 0},
      {pitch: 66, startTime: 31.5, endTime: 32, program: 0},
      {pitch: 66, startTime: 32, endTime: 36.5, program: 0},
      {pitch: 66, startTime: 36.5, endTime: 37, program: 0},
      {pitch: 66, startTime: 37, endTime: 40, program: 0},
    ],
    tempos: [{time: 0, qpm: 60}],
    keySignatures: [{time: 0, key: 0}],
    timeSignatures: [{time: 0, numerator: 4, denominator: 4}],
    totalTime: 40
  };

  //const parsedNoteSequence = STAFF_USE_CASES;
  const parsedNoteSequence = noteSequences[0];
  console.log(parsedNoteSequence);

  useEffect(() => {
      if (parsedNoteSequence) {
        const UNIFORM_TIME_SIZE = 200;
        let visualizerRight;

        const sequence1 = parsedNoteSequence;
        const player1 = new mm.Player(false, {
          run: (note) => {
            visualizerRight.redraw(note, true);
          },
          stop: () => {}
        });

        let configRight = {
          noteHeight: 15,
          pixelsPerTimeStep: 0,
          instruments: [0],
          defaultKey: 7,
          scrollType: ssv.ScrollType.BAR
        };

        function initPlayerAndVisualizer(seq) {
          visualizerRight = new ssv.StaffSVGVisualizer(seq, staffRightRef.current, configRight);

          const tempo = 60;
          player1.setTempo(tempo);
        }

        initPlayerAndVisualizer(sequence1);
      }
  }, [noteSequences]); // Re-run effect when the midiFile prop changes

  return (
    <div>
      <div ref={staffRightRef}></div>
    </div>
  );
};

export default MidiVisualizerComponent;

import React, { useEffect, useRef } from 'react';
import * as mm from '@magenta/music';
import * as ssv from './staff_svg_visualizer.ts';
import { Midi } from '@tonejs/midi';

const MidiTrackVisualizer = ({ midiFile }) => {

  // Convert Tone.js MIDI data to a Magenta NoteSequence manually
  const noteSequence = new mm.NoteSequence();
  const { header, tracks } = tonejsMidi;
  var ticksPerQuarter = 4;
  if (header.ticksPerBeat != null) {
    ticksPerQuarter = header.ticksPerBeat;
  }
  const quarterToSixteenth = 4;

  // Initialize quantizationInfo with default values
  noteSequence.quantizationInfo = {
    stepsPerQuarter: 4,
    qpm: 120,
  };

  tracks.forEach((track) => {
    let currentTime = 0;
    track.notes.forEach((note) => {
      const pitch = note.midi;
      const startTime = (note.ticks / ticksPerQuarter) * quarterToSixteenth;
      const duration = (note.durationTicks / ticksPerQuarter) * quarterToSixteenth;
      noteSequence.notes.push({
        pitch,
        startTime,
        endTime: startTime + duration,
        velocity: note.velocity,
      });
      currentTime = Math.max(currentTime, startTime + duration);
    });
    noteSequence.totalTime = Math.max(noteSequence.totalTime, currentTime);
  });

  // Set totalQuantizedSteps and totalTime
  noteSequence.totalQuantizedSteps = Math.floor(
    (noteSequence.totalTime / 60) * noteSequence.quantizationInfo.stepsPerQuarter
  );

  // Create outputNoteSequence in the desired format
  const outputNoteSequence = {
    notes: [],
    tempos: [{ time: 0, qpm: 120 }], // Assuming default qpm is 120
    keySignatures: [{ time: 0, key: 0 }], // Assuming default key is C major
    timeSignatures: [{ time: 0, numerator: 4, denominator: 4 }], // Assuming default time signature is 4/4
    totalTime: noteSequence.totalTime,
  };

  noteSequence.notes.forEach((note) => {
    const outputNote = {
      pitch: note.pitch,
      startTime: note.startTime,
      endTime: note.endTime,
      program: 0, // Assuming default program is 0
      velocity: note.velocity,
    };
    outputNoteSequence.notes.push(outputNote);
  });

  console.log(outputNoteSequence);
  return outputNoteSequence;
};

export default MidiTrackVisualizer;

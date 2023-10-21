import React, { useEffect } from 'react';
import * as mm from '@magenta/music';
import * as Tone from 'tone';
const { Midi } = require('@tonejs/midi');

const MidiStaffVisualizer = ({ track }) => {
    useEffect(() => {
        if (!track || !track.notes || track.notes.length === 0) {
            console.error("Invalid track data");
            return;
        }

        const timeSignature = track.timeSignatures && track.timeSignatures.length > 0
            ? track.timeSignatures[0].timeSignature[0]
            : 4; // Default to 4/4 time signature if not provided

        const midi = new Midi();
        const midiTrack = midi.addTrack();
        track.notes.forEach((note) => {
            const { pitch, duration, time } = note;
            midiTrack.addNote({ midi: Tone.Frequency(pitch).toMidi(), time, duration });
        });

        const quantizedSequence = mm.sequences.quantizeNoteSequence(midiTrack, timeSignature);

        if (quantizedSequence.totalQuantizedSteps <= 0) {
            console.error("Invalid totalQuantizedSteps");
            return;
        }

        async function visualizeMidi() {
            const midiData = new Uint8Array(midi.toArray());
            const decodedMidi = mm.midiToSequenceProto(midiData);
            decodedMidi.totalQuantizedSteps = quantizedSequence.totalQuantizedSteps;

            // Log quantized sequence for debugging
            console.log("Quantized Sequence: ", decodedMidi);

            // Create StaffSVGVisualizer
            const visualizer = new mm.StaffSVGVisualizer(decodedMidi, document.body);
            visualizer.draw();
        }

        visualizeMidi();
    }, [track]);

    return null;
};

export default MidiStaffVisualizer;

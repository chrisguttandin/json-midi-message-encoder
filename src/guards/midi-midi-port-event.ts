import { IMidiMidiPortEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiMidiPortEvent = (event: TMidiEvent): event is IMidiMidiPortEvent => {
    return (<IMidiMidiPortEvent>event).midiPort !== undefined;
};

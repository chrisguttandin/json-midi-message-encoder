import { IMidiMidiPortEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isIMidiMidiPortEvent = (event: TMidiEvent): event is IMidiMidiPortEvent => {
    return ((<IMidiMidiPortEvent> event).midiPort !== undefined);
};

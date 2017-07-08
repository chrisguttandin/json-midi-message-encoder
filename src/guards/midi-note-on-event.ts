import { IMidiNoteOnEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isIMidiNoteOnEvent = (event: TMidiEvent): event is IMidiNoteOnEvent => {
    return ((<IMidiNoteOnEvent> event).noteOn !== undefined);
};

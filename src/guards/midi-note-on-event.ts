import { IMidiNoteOnEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiNoteOnEvent = (event: TMidiEvent): event is IMidiNoteOnEvent => {
    return ((<IMidiNoteOnEvent> event).noteOn !== undefined);
};

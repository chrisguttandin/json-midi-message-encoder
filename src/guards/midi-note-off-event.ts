import { IMidiNoteOffEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isIMidiNoteOffEvent = (event: TMidiEvent): event is IMidiNoteOffEvent => {
    return ((<IMidiNoteOffEvent> event).noteOff !== undefined);
};

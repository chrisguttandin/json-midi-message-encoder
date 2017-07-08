import { IMidiProgramChangeEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isIMidiProgramChangeEvent = (event: TMidiEvent): event is IMidiProgramChangeEvent => {
    return ((<IMidiProgramChangeEvent> event).programChange !== undefined);
};

import { IMidiProgramChangeEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiProgramChangeEvent = (event: TMidiEvent): event is IMidiProgramChangeEvent => {
    return (<IMidiProgramChangeEvent>event).programChange !== undefined;
};

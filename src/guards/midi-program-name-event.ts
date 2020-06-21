import { IMidiProgramNameEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiProgramNameEvent = (event: TMidiEvent): event is IMidiProgramNameEvent => {
    return (<IMidiProgramNameEvent>event).programName !== undefined;
};

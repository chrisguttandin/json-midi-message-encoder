import { IMidiPitchBendEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiPitchBendEvent = (event: TMidiEvent): event is IMidiPitchBendEvent => {
    return (<IMidiPitchBendEvent>event).pitchBend !== undefined;
};

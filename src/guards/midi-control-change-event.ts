import { IMidiControlChangeEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiControlChangeEvent = (event: TMidiEvent): event is IMidiControlChangeEvent => {
    return (<IMidiControlChangeEvent>event).controlChange !== undefined;
};

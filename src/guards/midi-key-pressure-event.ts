import { IMidiKeyPressureEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiKeyPressureEvent = (event: TMidiEvent): event is IMidiKeyPressureEvent => {
    return (<IMidiKeyPressureEvent>event).keyPressure !== undefined;
};

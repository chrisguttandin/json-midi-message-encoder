import { IMidiSetTempoEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiSetTempoEvent = (event: TMidiEvent): event is IMidiSetTempoEvent => {
    return (<IMidiSetTempoEvent>event).setTempo !== undefined;
};

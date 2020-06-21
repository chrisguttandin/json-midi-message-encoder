import { IMidiUnknownTextEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiUnknownTextEvent = (event: TMidiEvent): event is IMidiUnknownTextEvent => {
    return (<IMidiUnknownTextEvent>event).metaTypeByte !== undefined;
};

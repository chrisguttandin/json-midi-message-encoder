import { IMidiCuePointEvent, IMidiUnknownTextEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiCuePointEvent = (event: TMidiEvent): event is IMidiCuePointEvent => {
    return (<IMidiCuePointEvent>event).cuePoint !== undefined && (<IMidiUnknownTextEvent>event).metaTypeByte === undefined;
};

import { IMidiTextEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiTextEvent = (event: TMidiEvent): event is IMidiTextEvent => {
    return ((<IMidiTextEvent> event).text !== undefined);
};

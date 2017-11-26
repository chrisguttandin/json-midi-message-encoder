import { IMidiTextEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isIMidiTextEvent = (event: TMidiEvent): event is IMidiTextEvent => {
    return ((<IMidiTextEvent> event).text !== undefined);
};

import { IMidiSmpteOffsetEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isIMidiSmpteOffsetEvent = (event: TMidiEvent): event is IMidiSmpteOffsetEvent => {
    return ((<IMidiSmpteOffsetEvent> event).smpteOffset !== undefined);
};

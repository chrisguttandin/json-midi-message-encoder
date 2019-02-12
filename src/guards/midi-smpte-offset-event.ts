import { IMidiSmpteOffsetEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiSmpteOffsetEvent = (event: TMidiEvent): event is IMidiSmpteOffsetEvent => {
    return ((<IMidiSmpteOffsetEvent> event).smpteOffset !== undefined);
};

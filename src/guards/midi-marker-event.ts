import { IMidiMarkerEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiMarkerEvent = (event: TMidiEvent): event is IMidiMarkerEvent => {
    return ((<IMidiMarkerEvent> event).marker !== undefined);
};

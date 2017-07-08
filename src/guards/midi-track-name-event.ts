import { IMidiTrackNameEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isIMidiTrackNameEvent = (event: TMidiEvent): event is IMidiTrackNameEvent => {
    return ((<IMidiTrackNameEvent> event).trackName !== undefined);
};

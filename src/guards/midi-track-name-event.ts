import { IMidiTrackNameEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiTrackNameEvent = (event: TMidiEvent): event is IMidiTrackNameEvent => {
    return ((<IMidiTrackNameEvent> event).trackName !== undefined);
};

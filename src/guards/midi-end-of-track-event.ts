import { IMidiEndOfTrackEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiEndOfTrackEvent = (event: TMidiEvent): event is IMidiEndOfTrackEvent => {
    return (<IMidiEndOfTrackEvent>event).endOfTrack !== undefined;
};

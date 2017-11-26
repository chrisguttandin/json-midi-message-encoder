import { IMidiLyricEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isIMidiLyricEvent = (event: TMidiEvent): event is IMidiLyricEvent => {
    return ((<IMidiLyricEvent> event).lyric !== undefined);
};

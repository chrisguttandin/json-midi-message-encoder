import { IMidiInstrumentNameEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiInstrumentNameEvent = (event: TMidiEvent): event is IMidiInstrumentNameEvent => {
    return (<IMidiInstrumentNameEvent>event).instrumentName !== undefined;
};

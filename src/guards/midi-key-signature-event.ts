import { IMidiKeySignatureEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiKeySignatureEvent = (event: TMidiEvent): event is IMidiKeySignatureEvent => {
    return ((<IMidiKeySignatureEvent> event).keySignature !== undefined);
};

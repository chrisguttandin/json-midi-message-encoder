import { IMidiKeySignatureEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isIMidiKeySignatureEvent = (event: TMidiEvent): event is IMidiKeySignatureEvent => {
    return ((<IMidiKeySignatureEvent> event).keySignature !== undefined);
};

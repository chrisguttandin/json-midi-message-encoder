import { IMidiTimeSignatureEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiTimeSignatureEvent = (event: TMidiEvent): event is IMidiTimeSignatureEvent => {
    return ((<IMidiTimeSignatureEvent> event).timeSignature !== undefined);
};

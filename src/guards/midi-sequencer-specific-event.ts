import { IMidiSequencerSpecificEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiSequencerSpecificEvent = (event: TMidiEvent): event is IMidiSequencerSpecificEvent => {
    return ((<IMidiSequencerSpecificEvent> event).sequencerSpecificData !== undefined);
};

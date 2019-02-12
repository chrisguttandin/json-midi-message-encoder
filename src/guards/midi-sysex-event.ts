import { IMidiSysexEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiSysexEvent = (event: TMidiEvent): event is IMidiSysexEvent => {
    return ((<IMidiSysexEvent> event).sysex !== undefined);
};

import { IMidiSysexEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isIMidiSysexEvent = (event: TMidiEvent): event is IMidiSysexEvent => {
    return ((<IMidiSysexEvent> event).sysex !== undefined);
};

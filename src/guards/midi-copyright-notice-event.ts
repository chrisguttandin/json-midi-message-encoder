import { IMidiCopyrightNoticeEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiCopyrightNoticeEvent = (event: TMidiEvent): event is IMidiCopyrightNoticeEvent => {
    return ((<IMidiCopyrightNoticeEvent> event).copyrightNotice !== undefined);
};

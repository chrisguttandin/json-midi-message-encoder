import { IMidiChannelPrefixEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isIMidiChannelPrefixEvent = (event: TMidiEvent): event is IMidiChannelPrefixEvent => {
    return ((<IMidiChannelPrefixEvent> event).channelPrefix !== undefined);
};

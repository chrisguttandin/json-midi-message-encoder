import { IMidiChannelPressureEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiChannelPressureEvent = (event: TMidiEvent): event is IMidiChannelPressureEvent => {
    return ((<IMidiChannelPressureEvent> event).channelPressure !== undefined);
};

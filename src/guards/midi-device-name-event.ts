import { IMidiDeviceNameEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isMidiDeviceNameEvent = (event: TMidiEvent): event is IMidiDeviceNameEvent => {
    return (<IMidiDeviceNameEvent>event).deviceName !== undefined;
};

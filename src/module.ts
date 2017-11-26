import { TMidiEvent } from 'midi-json-parser-worker';
import { isIMidiChannelPrefixEvent } from './guards/midi-channel-prefix-event';
import { isIMidiControlChangeEvent } from './guards/midi-control-change-event';
import { isIMidiEndOfTrackEvent } from './guards/midi-end-of-track-event';
import { isIMidiKeySignatureEvent } from './guards/midi-key-signature-event';
import { isIMidiLyricEvent } from './guards/midi-lyric-event';
import { isIMidiSetTempoEvent } from './guards/midi-set-tempo-event';
import { isIMidiMidiPortEvent } from './guards/midi-midi-port-event';
import { isIMidiNoteOffEvent } from './guards/midi-note-off-event';
import { isIMidiNoteOnEvent } from './guards/midi-note-on-event';
import { isIMidiPitchBendEvent } from './guards/midi-pitch-bend-event';
import { isIMidiProgramChangeEvent } from './guards/midi-prorgam-change-event';
import { isIMidiSmpteOffsetEvent } from './guards/midi-smpte-offset-event';
import { isIMidiSysexEvent } from './guards/midi-sysex-event';
import { isIMidiTimeSignatureEvent } from './guards/midi-time-signature-event';
import { isIMidiTrackNameEvent } from './guards/midi-track-name-event';
import { createArrayBufferWithDataView } from './helper/create-array-buffer-with-data-view';
import { joinArrayBuffers } from './helper/join-array-buffers';
import { writeVariableLengthQuantity } from './helper/write-variable-length-quantity';

// @todo Remove this declaration again when TypeScript is aware of the TextEncoder.
declare class TextEncoder {

    public encode (input: string): Uint8Array;

}

export const encode = (event: TMidiEvent) => {
    if (isIMidiChannelPrefixEvent(event)) {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(4);

        // Write an eventTypeByte with a value of 0xFF.
        dataView.setUint8(0, 0xFF);
        // Write a metaTypeByte with a value of 0x20.
        dataView.setUint8(1, 0x20);
        dataView.setUint8(2, 1);
        dataView.setUint8(3, event.channelPrefix);

        return arrayBuffer;
    }

    if (isIMidiControlChangeEvent(event)) {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(3);

        dataView.setUint8(0, 0xB0 | (event.channel & 0xF)); // tslint:disable-line:no-bitwise
        dataView.setUint8(1, event.controlChange.type);
        dataView.setUint8(2, event.controlChange.value);

        return arrayBuffer;
    }

    if (isIMidiEndOfTrackEvent(event)) {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(3);

        // Write an eventTypeByte with a value of 0xFF.
        dataView.setUint8(0, 0xFF);
        // Write a metaTypeByte with a value of 0x2F.
        dataView.setUint8(1, 0x2F);
        dataView.setUint8(2, 0);

        return arrayBuffer;
    }

    if (isIMidiKeySignatureEvent(event)) {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(5);

        // Write an eventTypeByte with a value of 0xFF.
        dataView.setUint8(0, 0xFF);
        // Write a metaTypeByte with a value of 0x59.
        dataView.setUint8(1, 0x59);
        dataView.setUint8(2, 2);
        dataView.setUint8(3, event.keySignature.key);
        dataView.setUint8(4, event.keySignature.scale);

        return arrayBuffer;
    }

    if (isIMidiLyricEvent(event)) {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(2);

        // Write an eventTypeByte with a value of 0xFF.
        dataView.setUint8(0, 0xFF);
        // Write a metaTypeByte with a value of 0x05.
        dataView.setUint8(1, 0x05);

        const textEncoder = new TextEncoder();

        const textArrayBuffer = <ArrayBuffer> textEncoder.encode(event.lyric).buffer;

        const textLengthArrayBuffer = writeVariableLengthQuantity(textArrayBuffer.byteLength);

        return joinArrayBuffers([ arrayBuffer, textLengthArrayBuffer, textArrayBuffer ]);
    }

    if (isIMidiMidiPortEvent(event)) {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(4);

        // Write an eventTypeByte with a value of 0xFF.
        dataView.setUint8(0, 0xFF);
        // Write a metaTypeByte with a value of 0x21.
        dataView.setUint8(1, 0x21);
        dataView.setUint8(2, 1);
        dataView.setUint8(3, event.midiPort);

        return arrayBuffer;
    }

    if (isIMidiNoteOffEvent(event)) {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(3);

        dataView.setUint8(0, 0x80 | (event.channel & 0xF)); // tslint:disable-line:no-bitwise
        dataView.setUint8(1, event.noteOff.noteNumber);
        dataView.setUint8(2, event.noteOff.velocity);

        return arrayBuffer;
    }

    if (isIMidiNoteOnEvent(event)) {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(3);

        dataView.setUint8(0, 0x90 | (event.channel & 0xF)); // tslint:disable-line:no-bitwise
        dataView.setUint8(1, event.noteOn.noteNumber);
        dataView.setUint8(2, event.noteOn.velocity);

        return arrayBuffer;
    }

    if (isIMidiPitchBendEvent(event)) {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(3);

        dataView.setUint8(0, 0xE0 | (event.channel & 0xF)); // tslint:disable-line:no-bitwise
        dataView.setUint8(1, event.pitchBend & 0x7F); // tslint:disable-line:no-bitwise
        dataView.setUint8(2, event.pitchBend >> 7); // tslint:disable-line:no-bitwise

        return arrayBuffer;
    }

    if (isIMidiProgramChangeEvent(event)) {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(2);

        dataView.setUint8(0, 0xC0 | (event.channel & 0xF)); // tslint:disable-line:no-bitwise
        dataView.setUint8(1, event.programChange.programNumber);

        return arrayBuffer;
    }

    if (isIMidiSetTempoEvent(event)) {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(6);

        // Write an eventTypeByte with a value of 0xFF.
        dataView.setUint8(0, 0xFF);
        // Write a metaTypeByte with a value of 0x51.
        dataView.setUint8(1, 0x51);
        dataView.setUint8(2, 3);
        dataView.setUint8(3, event.setTempo.microsecondsPerBeat >> 16); // tslint:disable-line:no-bitwise
        dataView.setUint8(4, event.setTempo.microsecondsPerBeat >> 8); // tslint:disable-line:no-bitwise
        dataView.setUint8(5, event.setTempo.microsecondsPerBeat);

        return arrayBuffer;
    }

    if (isIMidiSmpteOffsetEvent(event)) {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(8);

        let frameRateByte;

        if (event.smpteOffset.frameRate === 24) {
            frameRateByte = 0x00;
        } else if (event.smpteOffset.frameRate === 25) {
            frameRateByte = 0x20;
        } else if (event.smpteOffset.frameRate === 29) {
            frameRateByte = 0x40;
        } else if (event.smpteOffset.frameRate === 30) {
            frameRateByte = 0x60;
        } else {
            throw new Error(); // @todo
        }

        // Write an eventTypeByte with a value of 0xFF.
        dataView.setUint8(0, 0xFF);
        // Write a metaTypeByte with a value of 0x54.
        dataView.setUint8(1, 0x54);
        dataView.setUint8(2, 5);
        dataView.setUint8(3, event.smpteOffset.hour | frameRateByte); // tslint:disable-line:no-bitwise
        dataView.setUint8(4, event.smpteOffset.minutes);
        dataView.setUint8(5, event.smpteOffset.seconds);
        dataView.setUint8(6, event.smpteOffset.frame);
        dataView.setUint8(7, event.smpteOffset.subFrame);

        return arrayBuffer;
    }

    if (isIMidiSysexEvent(event)) {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(1);

        // Write an eventTypeByte with a value of 0xF0.
        dataView.setUint8(0, 0xF0);

        const sysexLength = event.sysex.length / 2;

        const sysexLengthArrayBuffer = writeVariableLengthQuantity(sysexLength);

        const { arrayBuffer: sysexArrayBuffer, dataView: sysexDataView } = createArrayBufferWithDataView(sysexLength);

        for (let i = 0; i < event.sysex.length; i += 2) {
            sysexDataView.setUint8(i / 2, parseInt(event.sysex.slice(i, i + 2), 16));
        }

        return joinArrayBuffers([ arrayBuffer, sysexLengthArrayBuffer, sysexArrayBuffer ]);
    }

    if (isIMidiTimeSignatureEvent(event)) {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(7);

        let denominator = event.timeSignature.denominator;

        let counter = 0;

        while (denominator > 1) {
            denominator /= 2;
            counter += 1;
        }

        // Write an eventTypeByte with a value of 0xFF.
        dataView.setUint8(0, 0xFF);
        // Write a metaTypeByte with a value of 0x58.
        dataView.setUint8(1, 0x58);
        dataView.setUint8(2, 4);
        dataView.setUint8(3, event.timeSignature.numerator);
        dataView.setUint8(4, counter);
        dataView.setUint8(5, event.timeSignature.metronome);
        dataView.setUint8(6, event.timeSignature.thirtyseconds);

        return arrayBuffer;
    }

    if (isIMidiTrackNameEvent(event)) {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(2);

        // Write an eventTypeByte with a value of 0xFF.
        dataView.setUint8(0, 0xFF);
        // Write a metaTypeByte with a value of 0x03.
        dataView.setUint8(1, 0x03);

        const textEncoder = new TextEncoder();

        const textArrayBuffer = <ArrayBuffer> textEncoder.encode(event.trackName).buffer;

        const textLengthArrayBuffer = writeVariableLengthQuantity(textArrayBuffer.byteLength);

        return joinArrayBuffers([ arrayBuffer, textLengthArrayBuffer, textArrayBuffer ]);
    }

    throw new Error(`Unencodable event with a delta of "${ (<any> event).delta }".`);
};

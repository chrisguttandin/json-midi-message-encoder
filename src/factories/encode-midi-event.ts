import { isMidiChannelPrefixEvent } from '../guards/midi-channel-prefix-event';
import { isMidiControlChangeEvent } from '../guards/midi-control-change-event';
import { isMidiCopyrightNoticeEvent } from '../guards/midi-copyright-notice-event';
import { isMidiEndOfTrackEvent } from '../guards/midi-end-of-track-event';
import { isMidiInstrumentNameEvent } from '../guards/midi-instrument-name-event';
import { isMidiKeySignatureEvent } from '../guards/midi-key-signature-event';
import { isMidiLyricEvent } from '../guards/midi-lyric-event';
import { isMidiMarkerEvent } from '../guards/midi-marker-event';
import { isMidiMidiPortEvent } from '../guards/midi-midi-port-event';
import { isMidiNoteOffEvent } from '../guards/midi-note-off-event';
import { isMidiNoteOnEvent } from '../guards/midi-note-on-event';
import { isMidiPitchBendEvent } from '../guards/midi-pitch-bend-event';
import { isMidiProgramChangeEvent } from '../guards/midi-program-change-event';
import { isMidiSequencerSpecificEvent } from '../guards/midi-sequencer-specific-event';
import { isMidiSetTempoEvent } from '../guards/midi-set-tempo-event';
import { isMidiSmpteOffsetEvent } from '../guards/midi-smpte-offset-event';
import { isMidiSysexEvent } from '../guards/midi-sysex-event';
import { isMidiTextEvent } from '../guards/midi-text-event';
import { isMidiTimeSignatureEvent } from '../guards/midi-time-signature-event';
import { isMidiTrackNameEvent } from '../guards/midi-track-name-event';
import { TEncodeMidiEventFactory } from '../types';

export const createEncodeMidiEvent: TEncodeMidiEventFactory = (
    createArrayBufferWithDataView,
    encodeMidiMetaEventWithText,
    joinArrayBuffers,
    writeVariableLengthQuantity
) => {
    return (event) => {
        if (isMidiChannelPrefixEvent(event)) {
            const { arrayBuffer, dataView } = createArrayBufferWithDataView(4);

            // Write an eventTypeByte with a value of 0xFF.
            dataView.setUint8(0, 0xFF);
            // Write a metaTypeByte with a value of 0x20.
            dataView.setUint8(1, 0x20);
            dataView.setUint8(2, 1);
            dataView.setUint8(3, event.channelPrefix);

            return arrayBuffer;
        }

        if (isMidiControlChangeEvent(event)) {
            const { arrayBuffer, dataView } = createArrayBufferWithDataView(3);

            dataView.setUint8(0, 0xB0 | (event.channel & 0xF)); // tslint:disable-line:no-bitwise
            dataView.setUint8(1, event.controlChange.type);
            dataView.setUint8(2, event.controlChange.value);

            return arrayBuffer;
        }

        if (isMidiCopyrightNoticeEvent(event)) {
            return encodeMidiMetaEventWithText(event, 0x02, 'copyrightNotice');
        }

        if (isMidiEndOfTrackEvent(event)) {
            const { arrayBuffer, dataView } = createArrayBufferWithDataView(3);

            // Write an eventTypeByte with a value of 0xFF.
            dataView.setUint8(0, 0xFF);
            // Write a metaTypeByte with a value of 0x2F.
            dataView.setUint8(1, 0x2F);
            dataView.setUint8(2, 0);

            return arrayBuffer;
        }

        if (isMidiInstrumentNameEvent(event)) {
            return encodeMidiMetaEventWithText(event, 0x04, 'instrumentName');
        }

        if (isMidiKeySignatureEvent(event)) {
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

        if (isMidiLyricEvent(event)) {
            return encodeMidiMetaEventWithText(event, 0x05, 'lyric');
        }

        if (isMidiMarkerEvent(event)) {
            return encodeMidiMetaEventWithText(event, 0x06, 'marker');
        }

        if (isMidiMidiPortEvent(event)) {
            const { arrayBuffer, dataView } = createArrayBufferWithDataView(4);

            // Write an eventTypeByte with a value of 0xFF.
            dataView.setUint8(0, 0xFF);
            // Write a metaTypeByte with a value of 0x21.
            dataView.setUint8(1, 0x21);
            dataView.setUint8(2, 1);
            dataView.setUint8(3, event.midiPort);

            return arrayBuffer;
        }

        if (isMidiNoteOffEvent(event)) {
            const { arrayBuffer, dataView } = createArrayBufferWithDataView(3);

            dataView.setUint8(0, 0x80 | (event.channel & 0xF)); // tslint:disable-line:no-bitwise
            dataView.setUint8(1, event.noteOff.noteNumber);
            dataView.setUint8(2, event.noteOff.velocity);

            return arrayBuffer;
        }

        if (isMidiNoteOnEvent(event)) {
            const { arrayBuffer, dataView } = createArrayBufferWithDataView(3);

            dataView.setUint8(0, 0x90 | (event.channel & 0xF)); // tslint:disable-line:no-bitwise
            dataView.setUint8(1, event.noteOn.noteNumber);
            dataView.setUint8(2, event.noteOn.velocity);

            return arrayBuffer;
        }

        if (isMidiPitchBendEvent(event)) {
            const { arrayBuffer, dataView } = createArrayBufferWithDataView(3);

            dataView.setUint8(0, 0xE0 | (event.channel & 0xF)); // tslint:disable-line:no-bitwise
            dataView.setUint8(1, event.pitchBend & 0x7F); // tslint:disable-line:no-bitwise
            dataView.setUint8(2, event.pitchBend >> 7); // tslint:disable-line:no-bitwise

            return arrayBuffer;
        }

        if (isMidiProgramChangeEvent(event)) {
            const { arrayBuffer, dataView } = createArrayBufferWithDataView(2);

            dataView.setUint8(0, 0xC0 | (event.channel & 0xF)); // tslint:disable-line:no-bitwise
            dataView.setUint8(1, event.programChange.programNumber);

            return arrayBuffer;
        }

        if (isMidiSequencerSpecificEvent(event)) {
            const { arrayBuffer, dataView } = createArrayBufferWithDataView(2);

            // Write an eventTypeByte with a value of 0xFF.
            dataView.setUint8(0, 0xFF);
            // Write a metaTypeByte with a value of 0x7F.
            dataView.setUint8(1, 0x7F);

            const sequencerSpecificDataLength = event.sequencerSpecificData.length / 2;

            const sequencerSpecificDataLengthArrayBuffer = writeVariableLengthQuantity(sequencerSpecificDataLength);

            const {
                arrayBuffer: sequencerSpecificDataArrayBuffer,
                dataView: sequencerSpecificDataDataView
            } = createArrayBufferWithDataView(sequencerSpecificDataLength);

            for (let i = 0; i < event.sequencerSpecificData.length; i += 2) {
                sequencerSpecificDataDataView.setUint8(i / 2, parseInt(event.sequencerSpecificData.slice(i, i + 2), 16));
            }

            return joinArrayBuffers([ arrayBuffer, sequencerSpecificDataLengthArrayBuffer, sequencerSpecificDataArrayBuffer ]);
        }

        if (isMidiSetTempoEvent(event)) {
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

        if (isMidiSmpteOffsetEvent(event)) {
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

        if (isMidiSysexEvent(event)) {
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

        if (isMidiTimeSignatureEvent(event)) {
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

        if (isMidiTextEvent(event)) {
            return encodeMidiMetaEventWithText(event, 0x01, 'text');
        }

        if (isMidiTrackNameEvent(event)) {
            return encodeMidiMetaEventWithText(event, 0x03, 'trackName');
        }

        throw new Error(`Unencodable event with a delta of "${ (<any> event).delta }".`);
    };
};

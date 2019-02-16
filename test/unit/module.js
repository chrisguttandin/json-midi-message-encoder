import { encode } from '../../src/module';

const arrayfy = (arrayBuffer) => Array.from(new Uint8Array(arrayBuffer));

describe('module', () => {

    describe('encode()', () => {

        it('should encode a channel prefix event', () => {
            const arrayBuffer = encode({ channelPrefix: 12 });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 255, 32, 1, 12 ]);
        });

        it('should encode a control change event', () => {
            const arrayBuffer = encode({ channel: 7, controlChange: { type: 23, value: 50 } });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 183, 23, 50 ]);
        });

        it('should encode a copyright notice event', () => {
            const arrayBuffer = encode({ copyrightNotice: '6/5/2003 by  ANTONIO LAVIANO (montevideo uruguay)', delta: 0 });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 255, 2, 49, 54, 47, 53, 47, 50, 48, 48, 51, 32, 98, 121, 32, 32, 65, 78, 84, 79, 78, 73, 79, 32, 76, 65, 86, 73, 65, 78, 79, 32, 40, 109, 111, 110, 116, 101, 118, 105, 100, 101, 111, 32, 117, 114, 117, 103, 117, 97, 121, 41 ]);
        });

        it('should encode an end of track event', () => {
            const arrayBuffer = encode({ endOfTrack: true });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 255, 47, 0 ]);
        });

        it('should encode a instrument name event', () => {
            const arrayBuffer = encode({ delta: 0, instrumentName: 'Steinway Grand Piano' });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 255, 4, 20, 83, 116, 101, 105, 110, 119, 97, 121, 32, 71, 114, 97, 110, 100, 32, 80, 105, 97, 110, 111 ]);
        });

        it('should encode a key signature event', () => {
            const arrayBuffer = encode({ keySignature: { key: 15, scale: 34 } });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 255, 89, 2, 15, 34 ]);
        });

        it('should encode a lyric event', () => {
            const arrayBuffer = encode({ lyric: 'a fake lyric' });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 255, 5, 12, 97, 32, 102, 97, 107, 101, 32, 108, 121, 114, 105, 99 ]);
        });

        it('should encode a midi port event', () => {
            const arrayBuffer = encode({ midiPort: 42 });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 255, 33, 1, 42 ]);
        });

        it('should encode a note off event', () => {
            const arrayBuffer = encode({ channel: 6, noteOff: { noteNumber: 102, velocity: 3 } });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 134, 102, 3 ]);
        });

        it('should encode a note on event', () => {
            const arrayBuffer = encode({ channel: 3, noteOn: { noteNumber: 12, velocity: 73 } });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 147, 12, 73 ]);
        });

        it('should encode a pitch bend event', () => {
            const arrayBuffer = encode({ channel: 6, pitchBend: 138 });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 230, 10, 1 ]);
        });

        it('should encode a program change event', () => {
            const arrayBuffer = encode({ channel: 1, programChange: { programNumber: 65 } });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 193, 65 ]);
        });

        it('should encode a sequencer specific data event', () => {
            const arrayBuffer = encode({ delta: 0, sequencerSpecificData: '000041' });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 255, 127, 3, 0, 0, 65 ]);
        });

        it('should encode a set tempo event', () => {
            const arrayBuffer = encode({ setTempo: { microsecondsPerBeat: 500000 } });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 255, 81, 3, 7, 161, 32 ]);
        });

        it('should encode a smpte offset event', () => {
            const arrayBuffer = encode({
                smpteOffset: {
                    frame: 0,
                    frameRate: 30,
                    hour: 0,
                    minutes: 0,
                    seconds: 0,
                    subFrame: 0
                }
            });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 255, 84, 5, 96, 0, 0, 0, 0 ]);
        });

        it('should encode a sysex event', () => {
            const arrayBuffer = encode({ channel: 7, sysex: '7E7F0901F7' });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 240, 5, 126, 127, 9, 1, 247 ]);
        });

        it('should encode a text event', () => {
            const arrayBuffer = encode({ text: 'a fake text' });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 255, 1, 11, 97, 32, 102, 97, 107, 101, 32, 116, 101, 120, 116 ]);
        });

        it('should encode a time signature event', () => {
            const arrayBuffer = encode({
                timeSignature: {
                    denominator: 4,
                    metronome: 24,
                    numerator: 4,
                    thirtyseconds: 8
                }
            });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 255, 88, 4, 4, 2, 24, 8 ]);
        });

        it('should encode a track name event', () => {
            const arrayBuffer = encode({
                trackName: 'a fake track name'
            });

            expect(arrayfy(arrayBuffer)).to.deep.equal([ 255, 3, 17, 97, 32, 102, 97, 107, 101, 32, 116, 114, 97, 99, 107, 32, 110, 97, 109, 101 ]);
        });

    });

});

import { createArrayBufferWithDataView } from '../../../src/functions/create-array-buffer-with-data-view';
import { createWriteVariableLengthQuantity } from '../../../src/factories/write-variable-length-quantity';

const arrayfy = (arrayBuffer) => Array.from(new Uint8Array(arrayBuffer));

describe('writeVariableLengthQuantity()', () => {

    let writeVariableLengthQuantity;

    beforeEach(() => writeVariableLengthQuantity = createWriteVariableLengthQuantity(createArrayBufferWithDataView));

    it('should encode a number which fits into a single byte', () => {
        const value = Math.floor(Math.random() * 128);
        const arrayBuffer = writeVariableLengthQuantity(value);

        expect(arrayBuffer.byteLength).to.equal(1);
        expect(arrayfy(arrayBuffer)).to.deep.equal([ value ]);
    });

    it('should encode 128 in two bytes', () => {
        const arrayBuffer = writeVariableLengthQuantity(128);

        expect(arrayBuffer.byteLength).to.equal(2);
        expect(arrayfy(arrayBuffer)).to.deep.equal([ 129, 0 ]);
    });

    it('should encode a number which needs to be encoded in two bytes', () => {
        const value = Math.floor(128 + (Math.random() * 16256));
        const arrayBuffer = writeVariableLengthQuantity(value);

        expect(arrayBuffer.byteLength).to.equal(2);
        expect(arrayfy(arrayBuffer)).to.deep.equal([ ((value >> 7) & 0x7F) | 0x80, value & 0x7F ]); // eslint-disable-line no-bitwise
    });

    it('should encode 16384 in three bytes', () => {
        const arrayBuffer = writeVariableLengthQuantity(16384);

        expect(arrayBuffer.byteLength).to.equal(3);
        expect(arrayfy(arrayBuffer)).to.deep.equal([ 129, 128, 0 ]);
    });

    it('should encode a number which needs to be encoded in three bytes', () => {
        const value = Math.floor(16384 + (Math.random() * 2080768));
        const arrayBuffer = writeVariableLengthQuantity(value);

        expect(arrayBuffer.byteLength).to.equal(3);
        expect(arrayfy(arrayBuffer)).to.deep.equal([ ((value >> 14) & 0x7F) | 0x80, ((value >> 7) & 0x7F) | 0x80, value & 0x7F ]); // eslint-disable-line no-bitwise
    });

});

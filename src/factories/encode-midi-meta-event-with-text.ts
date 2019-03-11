import { TEncodeMidiMetaEventWithTextFactory } from '../types';

export const createEncodeMidiMetaEventWithText: TEncodeMidiMetaEventWithTextFactory = (
    createArrayBufferWithDataView,
    joinArrayBuffers,
    writeVariableLengthQuantity
) => {
    return (event, metaTypeByte, key) => {
        const { arrayBuffer, dataView } = createArrayBufferWithDataView(2);

        // Write an eventTypeByte with a value of 0xFF.
        dataView.setUint8(0, 0xFF);
        // Write a metaTypeByte with the given value.
        dataView.setUint8(1, metaTypeByte);

        const textEncoder = new TextEncoder();

        const textArrayBuffer = <ArrayBuffer> textEncoder.encode(event[key]).buffer;

        const textLengthArrayBuffer = writeVariableLengthQuantity(textArrayBuffer.byteLength);

        return joinArrayBuffers([ arrayBuffer, textLengthArrayBuffer, textArrayBuffer ]);
    };
};

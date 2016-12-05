import { createArrayBufferWithDataView } from './create-array-buffer-with-data-view';

export const writeVariableLengthQuantity = (value) => {
    const numberOfBytes = Math.floor((Math.log(value + 1) / Math.log(2)) / 7);

    const { arrayBuffer, dataView } = createArrayBufferWithDataView(numberOfBytes);

    for (let i = 0, length = numberOfBytes - 1; i < length; i += 1) {
        dataView.setUint8(i, (value >> 7) | 0x80); // tslint:disable-line:no-bitwise

        value &= 0x7F; // tslint:disable-line:no-bitwise
    }

    dataView.setUint8(numberOfBytes - 1, value);

    return arrayBuffer;
};

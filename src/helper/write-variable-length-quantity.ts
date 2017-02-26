import { createArrayBufferWithDataView } from './create-array-buffer-with-data-view';

export const writeVariableLengthQuantity = (value) => {
    const numberOfBytes = Math.max(1, Math.floor((Math.log(value) / Math.log(2)) / 7) + 1);

    const { arrayBuffer, dataView } = createArrayBufferWithDataView(numberOfBytes);

    const length = numberOfBytes - 1;

    for (let i = 0; i < length; i += 1) {
        dataView.setUint8(i, (value >> 7) | 0x80); // tslint:disable-line:no-bitwise

        value &= 0x7F; // tslint:disable-line:no-bitwise
    }

    dataView.setUint8(numberOfBytes - 1, value);

    return arrayBuffer;
};

import { TWriteVariableLengthQuantityFactory } from '../types';

export const createWriteVariableLengthQuantity: TWriteVariableLengthQuantityFactory = (createArrayBufferWithDataView) => {
    return (value) => {
        const numberOfBytes = Math.max(1, Math.floor(Math.log(value) / Math.log(2) / 7) + 1);

        const { arrayBuffer, dataView } = createArrayBufferWithDataView(numberOfBytes);

        for (let i = 1; i < numberOfBytes; i += 1) {
            dataView.setUint8(numberOfBytes - 1 - i, ((value >> (i * 7)) & 0x7f) | 0x80); // tslint:disable-line:no-bitwise
        }

        dataView.setUint8(numberOfBytes - 1, value & 0x7f); // tslint:disable-line:no-bitwise

        return arrayBuffer;
    };
};

import { TWriteVariableLengthQuantityFactory } from '../types';

export const createWriteVariableLengthQuantity: TWriteVariableLengthQuantityFactory = (createArrayBufferWithDataView) => {
    return (value) => {
        const numberOfBytes = Math.max(1, Math.floor((Math.log(value) / Math.log(2)) / 7) + 1);

        const { arrayBuffer, dataView } = createArrayBufferWithDataView(numberOfBytes);

        const length = numberOfBytes - 1;

        let shiftedValue = value;

        for (let i = 0; i < length; i += 1) {
            dataView.setUint8(i, (shiftedValue >> 7) | 0x80); // tslint:disable-line:no-bitwise

            shiftedValue &= 0x7F; // tslint:disable-line:no-bitwise
        }

        dataView.setUint8(numberOfBytes - 1, shiftedValue);

        return arrayBuffer;
    };
};

import { TCreateArrayBufferWithDataViewFunction } from '../types';

export const createArrayBufferWithDataView: TCreateArrayBufferWithDataViewFunction = (length) => {
    const arrayBuffer = new ArrayBuffer(length);
    const dataView = new DataView(arrayBuffer);

    return { arrayBuffer, dataView };
};

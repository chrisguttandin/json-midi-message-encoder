import { TCreateArrayBufferWithDataViewFunction } from './create-array-buffer-with-data-view-function';
import { TEncodeMidiEventFunction } from './encode-midi-event-function';
import { TJoinArrayBuffersFunction } from './join-array-buffers-function';
import { TWriteVariableLengthQuantityFunction } from './write-variable-length-quantity-function';

export type TEncodeMidiEventFactory = (
    createArrayBufferWithDataView: TCreateArrayBufferWithDataViewFunction,
    joinArrayBuffers: TJoinArrayBuffersFunction,
    writeVariableLengthQuantity: TWriteVariableLengthQuantityFunction
) => TEncodeMidiEventFunction;

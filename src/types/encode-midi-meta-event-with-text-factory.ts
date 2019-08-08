import { TCreateArrayBufferWithDataViewFunction } from './create-array-buffer-with-data-view-function';
import { TEncodeMidiMetaEventWithTextFunction } from './encode-midi-meta-event-with-text-function';
import { TJoinArrayBuffersFunction } from './join-array-buffers-function';
import { TWriteVariableLengthQuantityFunction } from './write-variable-length-quantity-function';

export type TEncodeMidiMetaEventWithTextFactory = (
    createArrayBufferWithDataView: TCreateArrayBufferWithDataViewFunction,
    joinArrayBuffers: TJoinArrayBuffersFunction,
    textEncoder: TextEncoder,
    writeVariableLengthQuantity: TWriteVariableLengthQuantityFunction
) => TEncodeMidiMetaEventWithTextFunction;

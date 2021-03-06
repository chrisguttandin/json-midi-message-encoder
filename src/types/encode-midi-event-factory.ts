import { TCreateArrayBufferWithDataViewFunction } from './create-array-buffer-with-data-view-function';
import { TEncodeMidiEventFunction } from './encode-midi-event-function';
import { TEncodeMidiMetaEventWithTextFunction } from './encode-midi-meta-event-with-text-function';
import { TJoinArrayBuffersFunction } from './join-array-buffers-function';
import { TWriteVariableLengthQuantityFunction } from './write-variable-length-quantity-function';

export type TEncodeMidiEventFactory = (
    createArrayBufferWithDataView: TCreateArrayBufferWithDataViewFunction,
    encodeMidiMetaEventWithText: TEncodeMidiMetaEventWithTextFunction,
    joinArrayBuffers: TJoinArrayBuffersFunction,
    writeVariableLengthQuantity: TWriteVariableLengthQuantityFunction
) => TEncodeMidiEventFunction;

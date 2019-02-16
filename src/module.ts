import { createEncodeMidiEvent } from './factories/encode-midi-event';
import { createWriteVariableLengthQuantity } from './factories/write-variable-length-quantity';
import { createArrayBufferWithDataView } from './functions/create-array-buffer-with-data-view';
import { joinArrayBuffers } from './functions/join-array-buffers';

export * from './types';

const writeVariableLengthQuantity = createWriteVariableLengthQuantity(createArrayBufferWithDataView);
const encodeMidiEvent = createEncodeMidiEvent(createArrayBufferWithDataView, joinArrayBuffers, writeVariableLengthQuantity);

export { encodeMidiEvent as encode };

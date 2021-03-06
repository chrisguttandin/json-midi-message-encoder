import { createEncodeMidiEvent } from './factories/encode-midi-event';
import { createEncodeMidiMetaEventWithText } from './factories/encode-midi-meta-event-with-text';
import { createWriteVariableLengthQuantity } from './factories/write-variable-length-quantity';
import { createArrayBufferWithDataView } from './functions/create-array-buffer-with-data-view';
import { joinArrayBuffers } from './functions/join-array-buffers';

/*
 * @todo Explicitly referencing the barrel file seems to be necessary when enabling the
 * isolatedModules compiler option.
 */
export * from './types/index';

export const writeVariableLengthQuantity = createWriteVariableLengthQuantity(createArrayBufferWithDataView);

const encodeMidiEvent = createEncodeMidiEvent(
    createArrayBufferWithDataView,
    createEncodeMidiMetaEventWithText(createArrayBufferWithDataView, joinArrayBuffers, new TextEncoder(), writeVariableLengthQuantity),
    joinArrayBuffers,
    writeVariableLengthQuantity
);

export { encodeMidiEvent as encode };

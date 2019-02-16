import { TCreateArrayBufferWithDataViewFunction } from './create-array-buffer-with-data-view-function';
import { TWriteVariableLengthQuantityFunction } from './write-variable-length-quantity-function';

export type TWriteVariableLengthQuantityFactory = (
    createArrayBufferWithDataView: TCreateArrayBufferWithDataViewFunction
) => TWriteVariableLengthQuantityFunction;

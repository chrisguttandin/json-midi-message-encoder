import { TJoinArrayBuffersFunction } from '../types';

export const joinArrayBuffers: TJoinArrayBuffersFunction = (arrayBuffers) => {
    const byteLength = arrayBuffers.reduce((bytLngth, arrayBuffer) => bytLngth + arrayBuffer.byteLength, 0);

    const [, uint8Array] = arrayBuffers.reduce<[number, Uint8Array]>(
        ([offset, nt8Rry], arrayBuffer) => {
            nt8Rry.set(new Uint8Array(arrayBuffer), offset);

            return [offset + arrayBuffer.byteLength, nt8Rry];
        },
        [0, new Uint8Array(byteLength)]
    );

    return <ArrayBuffer>uint8Array.buffer;
};

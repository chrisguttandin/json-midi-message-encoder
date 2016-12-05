export const createArrayBufferWithDataView = (length) => {
    const arrayBuffer = new ArrayBuffer(length);
    const dataView = new DataView(arrayBuffer);

    return { arrayBuffer, dataView };
};

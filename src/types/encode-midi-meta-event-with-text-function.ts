import { TMidiMetaEvent } from 'midi-json-parser-worker';

export type TEncodeMidiMetaEventWithTextFunction = <T extends TMidiMetaEvent & { [ P in U ]: string }, U extends keyof T>(
    event: T,
    metaTypeByte: number,
    key: U
) => ArrayBuffer;

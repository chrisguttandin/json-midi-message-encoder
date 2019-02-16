import { TMidiEvent } from 'midi-json-parser-worker';

export type TEncodeMidiEventFunction = (event: TMidiEvent) => ArrayBuffer;

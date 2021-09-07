import { Entity } from '../Entity/Entity';
import { Integer } from '../Types';
import { RegisterValue } from '../EXA/Register';
import { Host } from './Host';

export type RegisterReadCallback = () => (RegisterValue);
export type RegisterWriteCallback = (value: RegisterValue) => void;

export class HardwareRegister extends Entity {
    x: Integer;
    y: Integer;
    name: string;

    readCallback: RegisterReadCallback;
    writeCallback: RegisterWriteCallback;

    constructor(hostHandle: Host, x: Integer, y: Integer, name: string) {
        super(hostHandle);
    }

    setReadCallback(readCallback: RegisterReadCallback) {
        this.readCallback = readCallback;
    }
    setWriteCallback(writeCallback: RegisterWriteCallback) {
        this.writeCallback = writeCallback;
    }

    read() {
        return this.readCallback();
    }

    write(value: RegisterValue) {
        this.writeCallback(value);
    }
}
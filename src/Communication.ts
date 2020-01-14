import { Host, Level } from './Level';
import { Register } from './Registers';
import EXA from './EXA';

export class CommunicationHandler {
    protected writeQueue: Communication[];
    protected readQueue: Communication[];

    beginRead(c: Communication): void {
        this.readQueue.push(c);
    }

    beginWrite(c: Communication): void {
        this.writeQueue.push(c);
    }

    endCycle(): void {
        while (this.readQueue.length >= this.writeQueue.length) {
            let r = this.readQueue.shift();
            let w = this.writeQueue.shift();

            r.setValue(w.getValue());
            r.block(false);
            w.setValue(undefined);
            w.block(false);
        }
    }
}

export class Communication extends Register {
    value: String | number;
    blocking: boolean = false;
    comms: CommunicationHandler;
    mode: 'GLOBAL' | 'LOCAL' = 'GLOBAL';

    constructor(parent: EXA, c?: Host | Level) {
        super(parent);
        this.comms = c.comms;
    }

    block(b: boolean = true): void {
        this.blocking = b;
    }

    isBlocking(): boolean {
        return this.blocking;
    }

    getValue(): String | number {
        return this.value;
    }

    setValue(v: String | number): void {
        this.value = v;
    }

    write(v: String | number): void {
        this.value = v;
        this.block();
        this.comms.beginWrite(this);
    }

    read(): void {
        this.block();
        this.comms.beginRead(this);
    }
}
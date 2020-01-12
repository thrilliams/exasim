import { Room, Level } from './Level';

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

export class Communication {
    value: String | number;
    blocking: boolean = false;
    parent: CommunicationHandler;

    constructor(parent?: Room | Level) {
        this.parent = parent.comms;
    }

    block(b: boolean = true): void {
        this.blocking = b;
    }

    get isBlocking(): boolean {
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
        this.parent.beginWrite(this);
    }

    read(): void {
        this.block();
        this.parent.beginRead(this);
    }
}
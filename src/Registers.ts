import EXA from './EXA';

export class Register {
    value: String | number;
    parent: EXA;

    constructor(parent: EXA) {
        this.parent = parent;
    }

    getValue(): String | number {
        return this.value;
    }

    setValue(v: String | number): void {
        this.value = v;
    }

    isBlocking(): boolean {
        return false;
    }
}
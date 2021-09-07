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

export class RegisterManager {
    static getRegisterPattern(): { [key: string]: typeof Register } {
        return {
            'X': Register,
            'T': Register,
            'M': Register,
            'F': Register
        }
    }

    registers: { [key: string]: Register } = {};

    constructor(parent: EXA) {
        let registers = RegisterManager.getRegisterPattern();
        Object.keys(registers).forEach(e => {
            this.registers[e] = new registers[e](parent);
        })
    }
}
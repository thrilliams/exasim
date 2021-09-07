import { RegisterValue } from '../../EXA/Register';
import { HardwareRegister } from '../HardwareRegister';
import { Column } from './Column';

export class Input extends Column {
    constructor(label: string, values: RegisterValue[], register: HardwareRegister) {
        super(label, values, register);
        this.register.setReadCallback(this.readCallback.bind(this));
    }

    readCallback() {
        return this.values[this.index++];
    }
}
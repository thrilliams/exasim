import { RegisterValue } from '../../EXA/Register';
import { HardwareRegister } from '../HardwareRegister';
import { Column } from './Column';

export class Output extends Column {
    // TODO: Bind goal to Output
    constructor(label: string, values: RegisterValue[], register: HardwareRegister) {
        super(label, values, register);
    }

    writeCallback(value: RegisterValue) {
        this.values.push(value);
    }
}
import { Thing } from '../../base/Thing';
import { Integer } from '../../base/Types';
import { RegisterValue } from '../../EXA/Register';
import { HardwareRegister } from '../HardwareRegister';

export abstract class Column extends Thing {
    label: string;
    values: RegisterValue[];
    register: HardwareRegister;
    index: Integer;

    constructor(label: string, values: RegisterValue[], register: HardwareRegister) {
        super();

        this.label = label;
        this.values = values;
        this.register = register;

        this.index = 0 as Integer;
    }
}
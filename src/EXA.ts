import { Entity } from './Entity';
import { Register } from './Registers';

export default class EXA extends Entity {
    registers: {
        'X': Register,
        'T': Register,
        'M': Register,
        'F': Register
        // TODO: Cleaner register code
    }
}
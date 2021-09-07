import { Entity, EntityContainer } from './Entity';
import { RegisterManager } from './Registers';
import { Interpreter } from './Interpreter';
import loadFile from './FileSystem';

export default class EXA extends Entity {
    error: Error;
    interpreter: Interpreter;
    registers: RegisterManager;
    name: String;

    constructor(parent: EntityContainer, name = 'XA', code = '') {
        super(parent); // TODO: Make parent = player host

        this.name = name;
        this.registers = new RegisterManager(this);
        this.interpreter = new Interpreter(loadFile(code, false));
    }

    updateCode(code: string) {
        this.interpreter = new Interpreter(loadFile(code));
    }

    doCycle() { // Do each phase sequentially
        for (let i = 0; i < /* like 10 or sumthin */ 10; i++) {
            this.doPhase(i);
        }
    }

    doPhase(phase: number) {
        switch (phase) {
            case 0:
                this.removeIfInError();
                break;
            case 1:
                this.dropInstruction();
                break;
            case 2:
                this.highPriorityInstructions();
                break;
            case 3:
                this.removeIfInError();
                break;
            case 4:
                this.removeIfInError();
                break;
            case 5:
                this.removeIfInError();
                break;
            case 6:
                this.removeIfInError();
                break;
            case 7:
                this.removeIfInError();
                break;
            case 8:
                this.removeIfInError();
                break;
            case 9:
                this.removeIfInError();
                break;
            case 10:
                this.removeIfInError();
                break;
        }
    }

    removeIfInError() {
        if (this.error !== undefined) {
            this.kill()
        }
    }

    dropInstruction() {
        if (this.interpreter.nextInstruction().instruction === 'DROP') {
            this.interpreter.doNext();
        }
    }

    highPriorityInstructions() {

    }
}
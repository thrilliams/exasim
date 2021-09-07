import { Entity } from '../base/Entity';
import { EntityHolder } from '../base/EntityHolder';

class EXAContents extends EntityHolder {
    constructor() {
        super(1);
    }
}

export class EXA extends Entity {
    contents: EXAContents;

    constructor(parent: EntityHolder) {
        super(parent);
    }

    get add() {
        return this.contents.add;
    }

    get remove() {
        return this.contents.remove;
    }
}
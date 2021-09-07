import { EntityHolder } from './EntityHolder';
import { Thing } from './Thing';

export abstract class Entity extends Thing {
    parent: EntityHolder;

    constructor(parent: EntityHolder) {
        super();

        if (parent.add(this)) {
            this.parent = parent;
        } else {
            throw Error('Error creating entity: Failed to add to parent.')
        }
    }

    move(target: EntityHolder): boolean {
        if (this.parent.remove(this)) {
            if (target.add(this)) {
                return true;
            } else {
                this.parent.add(this, true);
                return false;
            }
        } else {
            return false;
        }
    }
}
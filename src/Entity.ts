import nanoid from 'nanoid';

export interface EntityContainer {
    size: { w: number, h: number };
    children: Entity[];
    addChild(e: Entity): boolean;
    removeChild(e: Entity): Entity | boolean;
    // Returns an entity if the entity was successfully removed, otherwise false if it did not exist
}

export abstract class EntityContainer implements EntityContainer {
    size: { w: number, h: number };
    children: Entity[] = [];

    constructor(size: { w: number, h: number }) {
        this.size = size;
    }

    get area(): number {
        return this.size.w * this.size.h;
    }

    canFit(e: Entity): boolean {
        let sum = 0;
        for (let i = 0; i < this.children.length; i++) {
            sum += this.children[i].area;
        }

        return sum + e.area <= this.area;
        // TODO: Shapes?
    }

    addChild(e: Entity): boolean {
        if (this.canFit(e)) {
            this.children.push(e);
            return true;
        } else {
            return false;
        }
    }

    removeChild(e: Entity): Entity | boolean {
        for (let i = 0; i < this.children.length; i++) {
            if (e.signature === this.children[i].signature) {
                this.children.splice(i, 1);
                return e;
            }
        }
        return false;
    }
}

export class Entity extends EntityContainer {
    // By default, entities are entity containers, might change this if it causes unforseeable bad stuff
    signature: String;
    parent: EntityContainer;

    constructor(parent?: EntityContainer, size: { w: number, h: number } = { w: 1, h: 1 }) {
        super(size);
        this.signature = nanoid();
        if (parent !== undefined) {
            this.parent = parent;
            this.parent.addChild(this);
        }
    }

    // The move method removes the entity from its parent and returns a function to be executed later which places the entity in the target
    move(target: EntityContainer): Function {
        if (this.parent !== undefined) {
            this.parent.removeChild(this);
            this.parent = undefined;
        }

        return (function () {
            if (target.addChild(this))
                this.parent = target;
            else
                console.log(new Error('Target EntityContainer has no more room'))
        }).bind(this)
    }
}
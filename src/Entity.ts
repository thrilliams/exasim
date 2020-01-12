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

    addChild(e: Entity): boolean {
        this.children.push(e);
        let sum = 0;
        for (let i = 0; i < this.children.length; i++) {
            sum += this.children[i].area;
        }

        if (sum + e.area <= this.area) {
            this.children.push(e);
            return true;
        } else {
            return false;
        }
        // TODO: Shapes?
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
    // By default, entities are entity containers, might change this if it causes difficulty
    signature: String;
    parent: EntityContainer;

    constructor(parent?: EntityContainer, size: { w: number, h: number } = { w: 1, h: 1 }) {
        super(size);
        this.signature = nanoid();
        if (this.parent !== undefined) {
            this.parent = parent;
            this.parent.addChild(this);
        }
    }

    move(target: EntityContainer): void {
        if (this.parent !== undefined) {
            this.parent.removeChild(this);
        }

        target.addChild(this);
        // TODO: Space constraints
    }
}
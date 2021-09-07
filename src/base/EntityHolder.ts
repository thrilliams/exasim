import { Thing } from './Thing';
import { Entity } from './Entity';

export abstract class EntityHolder extends Thing {
    size: number;
    contents: Map<string, Entity>;

    constructor(size: number) {
        super();

        this.size = size;
        this.contents = new Map();
    }

    add(entity: Entity, force = false): boolean {
        if ((this.contents.size < this.size && !this.contents.has(entity.id)) || force) {
            this.contents.set(entity.id, entity);
            return true;
        } else {
            return false;
        }
    }

    remove(entity: Entity): boolean {
        if (this.contents.has(entity.id)) {
            this.contents.delete(entity.id);
            return true;
        } else {
            return false;
        }
    }
}
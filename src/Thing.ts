import { nanoid } from 'nanoid';

export abstract class Thing {
    id: string;

    constructor() {
        this.id = nanoid();
    }
}
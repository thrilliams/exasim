import Sval from 'sval';

import { EntityContainer } from './Entity';
import { CommunicationHandler } from './Communication';

export class Room extends EntityContainer {
    links: { [key: number]: Room }
    comms = new CommunicationHandler();

    constructor(size: { w: number, h: number }) {
        super(size);
    }

    addLink(id: number, target: Room): void {
        this.links[id] = target;
    }

    removeLink(id: number) {
        delete this.links[id];
    }

    getLink(id: number): Room | boolean {
        if (id in this.links) {
            return this.links[id];
        } else {
            return false;
        }
    }

    setLinks(links: { id: number, target: Room }[], wipe = false): void {
        if (wipe) this.links = {};
        for (let i = 0; i < links.length; i++) {
            this.links[links[i].id] = links[i].target;
        }
    }
}

export class Level {
    comms = new CommunicationHandler();

    meta: {
        title: String,
        subtitle: String,
        description: String
    }
}
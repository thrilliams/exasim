import nanoid from 'nanoid';

import { EntityContainer, Entity } from './Entity';
import { CommunicationHandler } from './Communication';
import { VirtualNetwork } from './VirtualNetwork';
import loadFile from './FileSystem';
import EXA from './EXA';

export class Host extends EntityContainer {
    name: String;
    links: { [key: number]: Host };
    comms = new CommunicationHandler();

    constructor(size: { w: number, h: number }, name?: String) {
        super(size);
        this.name = name;
    }

    addLink(id: number, target: Host): void {
        if (this.links[id] !== undefined) {
            throw new Error('A link with that ID already exists');
        }
        this.links[id] = target;
    }

    removeLink(id: number) {
        delete this.links[id];
    }

    getLink(id: number): Host | boolean {
        if (id in this.links) {
            return this.links[id];
        } else {
            return false;
        }
    }

    setLinks(links: { id: number, target: Host }[], wipe = false): void {
        if (wipe) this.links = {};
        for (let i = 0; i < links.length; i++) {
            this.links[links[i].id] = links[i].target;
        }
    }
}

export class Level {
    comms = new CommunicationHandler();
    vn: VirtualNetwork;

    public playerHostHandle: string;
    hosts: { [key: string]: Host };

    links: {
        [key: string]: {
            firstHostHandle: string,
            firstID: number,
            secondHostHandle: string,
            secondID: number
        }
    }

    meta: {
        title: String,
        subtitle: String,
        description: String
    }

    constructor(config?: string, loadAsPath = false) {
        if (config !== undefined) {
            this.loadConfig(config, loadAsPath);
        } else {
            console.warn('No config was given, proceed with caution.');
        }
    }

    initialize(i?: number) {
        this.hosts = {};
        this.links = {};
        this.playerHostHandle = nanoid();
        this.hosts[this.playerHostHandle] = new Host({ w: 3, h: 3 }, 'Rhizome'); // TODO: Allow for altering the name of the player host
        if (this.vn !== undefined && i !== undefined) {
            this.meta = this.vn.getMeta();
            this.vn.scope.initializeTestRun(i);
        }
    }

    loadConfig(config: string, loadAsPath = false) {
        if (this.vn && this.vn.imported)
            throw new Error('Config has already been loaded');

        this.vn = new VirtualNetwork(this);

        this.vn.import(loadFile(config, loadAsPath));
    }

    createHost(size: { w: number, h: number }, name: String) {
        let id = nanoid();
        this.hosts[id] = new Host(size, name);
        return id;
    }

    createLink(firstHostHandle: string, firstID: number, secondHostHandle: string, secondID: number): string {
        this.getHost(firstHostHandle).addLink(firstID, this.getHost(secondHostHandle));
        this.getHost(secondHostHandle).addLink(secondID, this.getHost(firstHostHandle));
        let id = nanoid();
        this.links[id] = {
            firstHostHandle,
            firstID,
            secondHostHandle,
            secondID
        }
        return id;
    }

    modifyLink(linkHandle: string, newFirstID: number, newSecondID: number): void {
        let { firstHostHandle, secondHostHandle, firstID, secondID } = this.getLink(linkHandle);

        this.getHost(firstHostHandle).removeLink(firstID);
        this.getHost(secondHostHandle).removeLink(secondID);

        this.getHost(firstHostHandle).addLink(newFirstID, this.getHost(secondHostHandle));
        this.getHost(secondHostHandle).addLink(newSecondID, this.getHost(firstHostHandle));
    }

    getHost(handle: string): Host {
        return this.hosts[handle];
    }

    getLink(handle: string): { firstHostHandle: string, firstID: number, secondHostHandle: string, secondID: number } {
        return this.links[handle];
    }

    getEntities(type = Entity): Entity[] {
        let entities: Entity[] = [];
        Object.keys(this.hosts).forEach(e => {
            for (let i = 0; i < this.hosts[e].children.length; i++) {
                if (this.hosts[e].children[i] instanceof type) {
                    entities.push(this.hosts[e].children[i]);
                }
            }
        })
        return entities;
    }

    createExa(name = 'XA') {
        new EXA(this.getHost(this.playerHostHandle), name)
    }
}
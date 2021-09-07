import { Integer } from '../Types';
import { Thing } from '../Thing';
import { Host } from './Host';

export type LinkID = Integer | 'LINK_ID_NONE';

export class Link extends Thing {
    firstHost: Host;
    firstID: LinkID;

    secondHost: Host;
    secondID: LinkID;

    constructor(firstHost: Host, firstID: LinkID, secondHost: Host, secondID: LinkID) {
        super();

        this.modify(firstID, secondID);

        this.firstHost = firstHost;
        this.secondHost = secondHost;
    }

    modify(firstID: LinkID, secondID: LinkID) {
        this.firstID = firstID;
        this.secondID = secondID;
    }

    getIdForHost(host: Host) {
        if (host.id === this.firstHost.id) {
            return this.firstID;
        } else if (host.id === this.secondHost.id) {
            return this.secondID;
        } else {
            throw Error('Specified Host is not connected to this link.');
        }
    }
}
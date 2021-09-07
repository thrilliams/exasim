import { EntityHolder } from '../Entity/EntityHolder';
import { Integer } from '../Types';
import { Link } from './Link';

export class Host extends EntityHolder {
    name: string;
    x: Integer;
    y: Integer;
    width: Integer;
    height: Integer;
    links: Map<string, Link>;

    constructor(name: string, x: Integer, y: Integer, width: Integer, height: Integer) {
        super(width * height);
        this.links = new Map();

        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    addLink(link: Link) {
        this.links.set(link.id, link);
    }

    removeLink(link: Link) {
        this.links.delete(link.id);
    }

    getOutboundLinks(): Map<Integer, Link> {
        let outboundLinks = new Map<Integer, Link>();
        for (let link of this.links.values()) {
            let id = link.getIdForHost(this);
            if (id !== 'LINK_ID_NONE') {
                outboundLinks.set(id, link);
            }
        }
        return outboundLinks;
    }
}
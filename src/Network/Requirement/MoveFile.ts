import { File } from '../File';
import { Host } from '../Host';
import { Network } from '../Network';
import { Requirement } from './Requirement';

export class MoveFile extends Requirement {
    file: File;
    host: Host;

    constructor(network: Network, fileHandle: File, hostHandle: Host, description: string) {
        super(network, description);

        this.file = fileHandle;
        this.host = hostHandle;
    }

    checkComplete() {
        if (!this.network.files.has(this.file.id)) {
            this.setFailed();
        } else if (this.file.parent.id === this.host.id) {
            this.setComplete();
        }
    }
}
import { File } from '../File';
import { Network } from '../Network';
import { Requirement } from './Requirement';

export class DeleteFile extends Requirement {
    file: File;

    constructor(network: Network, fileHandle: File, description: string) {
        super(network, description);

        this.file = fileHandle;
    }

    checkComplete() {
        if (!this.network.files.has(this.file.id)) {
            this.setComplete();
        }
    }
}
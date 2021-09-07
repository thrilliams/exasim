import { File, FileContents } from '../File';
import { Host } from '../Host';
import { Network } from '../Network';
import { Requirement } from './Requirement';

export class MoveAndChangeFile extends Requirement {
    file: File;
    host: Host;
    contents: FileContents;

    constructor(network: Network, fileHandle: File, hostHandle: Host,
        contents: FileContents, description: string) {
        super(network, description);

        this.file = fileHandle;
        this.host = hostHandle;
        this.contents = contents;
    }

    checkComplete() {
        if (!this.network.files.has(this.file.id)) {
            this.setFailed();
        } else if (this.file.parent.id === this.host.id) {
            if (this.file.contents.length === this.contents.length) {
                let valid = true;

                for (let i = 0; i < this.contents.length; i++) {
                    if (this.file.contents[i] !== this.contents[i]) {
                        valid = false;
                        break;
                    }
                }

                if (valid) {
                    this.setComplete();
                    return;
                }
            }
        }
    }
}
import { File, FileContents } from '../File';
import { Network } from '../Network';
import { Requirement } from './Requirement';

export class ChangeFile extends Requirement {
    file: File;
    contents: FileContents;

    constructor(network: Network, fileHandle: File, contents: FileContents, description: string) {
        super(network, description);

        this.file = fileHandle;
        this.contents = contents;
    }

    checkComplete() {
        let valid = true;

        if (!this.network.files.has(this.file.id)) {
            this.setFailed();
        } else if (this.file.contents.length === this.contents.length) {
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
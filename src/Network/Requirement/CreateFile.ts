import { File, FileContents } from '../File';
import { Host } from '../Host';
import { Network } from '../Network';
import { Requirement } from '../Requirement';

export class CreateFile extends Requirement {
    host: Host;
    contents: FileContents;

    constructor(network: Network, hostHandle: Host, contents: FileContents, description: string) {
        super(network, description);

        this.host = hostHandle;
        this.contents = contents;
    }

    checkComplete() {
        let files = [...this.host.contents.values()]
            .filter((file): file is File => file instanceof File);

        for (let file of files) {
            let valid = true;

            if (file.contents.length === this.contents.length) {
                for (let i = 0; i < this.contents.length; i++) {
                    if (file.contents[i] !== this.contents[i]) {
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
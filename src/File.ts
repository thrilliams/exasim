import { Entity, EntityContainer } from './Entity';

class File extends Entity {
    contents: Array<number | string>;

    constructor(parent: EntityContainer, contents?: Array<number | string>) {
        super(parent);

        this.contents = contents || [];
    }

    get(index: number): number | string | Error {
        if (index >= this.contents.length)
            return new Error('CANNOT READ PAST END OF FILE');
        
        return this.contents[index];
    }

    write(index: number, value: number | string) {
        if (index == this.contents.length) {
            this.contents.push(value);
        } else if (0 <= index && index < this.contents.length) {
            this.contents[index] = value;
        } else {
            throw new RangeError('Can\'t write before start of file!');
        }
    }
}
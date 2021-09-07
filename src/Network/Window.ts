import { Integer } from '../base/Types';
import { Thing } from '../base/Thing';

export class Window extends Thing {
    title: string;
    x: number;
    y: number;
    width: Integer;
    height: Integer;
    content: string[];

    constructor(title: string, x: number, y: number, width: Integer, height: Integer) {
        super();

        this.title = title;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.content = [];
    }

    print(text: string) {
        if (text.length > this.width) {
            text = text.slice(0, this.width - 3) + '...';
        }

        this.content.unshift(text);

        if (this.content.length > this.height) {
            this.content = this.content.slice(0, this.height);
        }
    }

    clear() {
        this.content = [];
    }
}
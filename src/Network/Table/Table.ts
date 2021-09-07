import { Thing } from '../../Thing';
import { Column } from './Column';

export class Table extends Thing {
    title: string;
    description: string;
    x: number;
    y: number;
    columns: Map<string, Column>;

    constructor(title: string, description: string, x: number, y: number) {
        super();

        this.title = title;
        this.description = description;
        this.x = x;
        this.y = y;
    }

    appendColumn(column: Column) {
        this.columns.set(column.id, column);
    }
}
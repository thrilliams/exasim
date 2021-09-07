import { Entity } from '../Entity/Entity';
import { Integer } from '../Types';
import { RegisterValue } from '../EXA/Register';
import { Host } from './Host';

export type FileIcon = 'FILE_ICON_DATA' | 'FILE_ICON_TEXT' | 'FILE_ICON_USER' | 'FILE_ICON_ARCHIVE'
    | 'FILE_ICON_FOLDER' | 'FILE_ICON_SECURE' | 'FILE_ICON_MOVIE' | 'FILE_ICON_MUSIC';
export type FileContents = RegisterValue[];

export class File extends Entity {
    // Functional
    fileId: Integer;
    icon: FileIcon;
    contents: FileContents;
    contentsIndex = 0;
    locked: boolean;
    readOnly: boolean;

    // Cosmetic
    columnCount: number;
    collapsed: boolean;

    constructor(hostHandle: Host, id: Integer, icon: FileIcon,
        contents: FileContents, locked = false,
        readOnly = false) {
        super(hostHandle);

        this.fileId = id;
        this.icon = icon;
        this.contents = contents;
        this.locked = locked;
        this.readOnly = readOnly;

        this.columnCount = 6;
        this.collapsed = false;
    }

    setColumnCount(columnCount: number) {
        this.columnCount = columnCount;
    }

    setInitiallyCollapsed() {
        this.collapsed = true;
    }

    read() {
        let item = this.contents[this.contentsIndex];

        this.contentsIndex++;
        if (this.contentsIndex > this.contents.length) this.contentsIndex = this.contents.length;

        return item;
    }

    write(value: RegisterValue) {
        if (this.contentsIndex < this.contents.length) {
            this.contents[this.contentsIndex] = value;
        } else {
            this.contents.push(value);
        }

        this.contentsIndex++;
        if (this.contentsIndex > this.contents.length) this.contentsIndex = this.contents.length;
    }

    seek(offset: number) {
        this.contentsIndex += offset;
        if (this.contentsIndex < 0) this.contentsIndex = 0;
        if (this.contentsIndex > this.contents.length) this.contentsIndex = this.contents.length;
    }

    void() {
        this.contents.splice(this.contentsIndex, 1);
    }

    testEof() {
        return this.contentsIndex === this.contents.length;
    }
}
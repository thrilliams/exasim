import { Thing } from '../Thing';
import { Integer, Keyword } from '../Types';
import { RegisterValue } from '../EXA/Register';
import { File, FileContents, FileIcon } from './File';
import { HardwareRegister, RegisterReadCallback, RegisterWriteCallback } from './HardwareRegister';
import { Host } from './Host';
import { Link, LinkID } from './Link';
import { ChangeFile } from './Requirement/ChangeFile';
import { CreateFile } from './Requirement/CreateFile';
import { CustomGoal } from './Requirement/CustomGoal';
import { DeleteFile } from './Requirement/DeleteFile';
import { MoveAndChangeFile } from './Requirement/MoveAndChangeFile';
import { MoveFile } from './Requirement/MoveFile';
import { Requirement, RequirementGroup } from './Requirement/Requirement';
import { Input } from './Table/Input';
import { Output } from './Table/Output';
import { Table } from './Table/Table';
import { Window } from './Window';


// Implements https://www.zachtronics.com/virtualnetwork/

export class Network extends Thing {
    hosts: Map<string, Host>;
    playerHost: Host;
    links: Map<string, Link>;
    files: Map<string, File>;
    hardwareRegisters: Map<string, HardwareRegister>;
    goals: Map<string, Requirement>;
    goalGroups: RequirementGroup[];
    table?: Table;
    windows: Map<string, Window>;

    title?: string;
    subtitle?: string;
    description?: string;

    constructor() {
        super();

        this.reinitialize();
    }

    reinitialize() {
        this.hosts = new Map();
        this.links = new Map();
        this.files = new Map();
        this.hardwareRegisters = new Map();
        this.goals = new Map();
        this.goalGroups = [];
        this.windows = new Map();

        let playerHost = new Host('Rhizome', 0 as Integer, 0 as Integer,
            3 as Integer, 3 as Integer);
        this.hosts.set(playerHost.id, playerHost);
        this.playerHost = playerHost;
    }

    setMeta(title: string, subtitle: string, description: string) {
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
    }

    createHost(name: string, x: Integer, y: Integer, width: Integer, height: Integer) {
        let host = new Host(name, x, y, width, height);
        this.hosts.set(host.id, host);
        return host.id;
    }

    createLink(firstHostHandle: string, firstID: LinkID,
        secondHostHandle: string, secondID: LinkID) {
        if (this.hosts.has(firstHostHandle) && this.hosts.has(secondHostHandle)) {
            let link = new Link(this.hosts.get(firstHostHandle), firstID,
                this.hosts.get(secondHostHandle), secondID);
            this.links.set(link.id, link);
            return link.id;
        } else {
            throw Error('Invalid host handle!');
        }
    }

    modifyLink(linkHandle: string, firstID: LinkID, secondID: LinkID) {
        if (this.links.has(linkHandle)) {
            this.links.get(linkHandle).modify(firstID, secondID);
        } else {
            throw Error('Invalid link handle!');
        }
    }

    createNormalFile(hostHandle: string, id: Integer, icon: FileIcon, contents: FileContents) {
        if (this.hosts.has(hostHandle)) {
            let file = new File(this.hosts.get(hostHandle), id, icon, contents);
            this.files.set(file.id, file);
            return file.id;
        } else {
            throw Error('Invalid host handle!');
        }
    }

    createLockedFile(hostHandle: string, id: Integer, icon: FileIcon, contents: FileContents) {
        if (this.hosts.has(hostHandle)) {
            let file = new File(this.hosts.get(hostHandle), id, icon, contents, true);
            this.files.set(file.id, file);
            return file.id;
        } else {
            throw Error('Invalid host handle!');
        }
    }

    setFileColumnCount(fileHandle: string, columnCount: Integer) {
        if (this.files.has(fileHandle)) {
            this.files.get(fileHandle).setColumnCount(columnCount);
        } else {
            throw Error('Invalid file handle!');
        }
    }

    setFileInitiallyCollapsed(fileHandle: string) {
        if (this.files.has(fileHandle)) {
            this.files.get(fileHandle).setInitiallyCollapsed();
        } else {
            throw Error('Invalid file handle!');
        }
    }

    createRegister(hostHandle: string, x: Integer, y: Integer, name: string) {
        if (this.hosts.has(hostHandle)) {
            let register = new HardwareRegister(this.hosts.get(hostHandle), x, y, name);
            this.hardwareRegisters.set(register.id, register);
            return register.id;
        } else {
            throw Error('Invalid host handle!');
        }
    }

    setRegisterReadCallback(registerHandle: string, readCallback: RegisterReadCallback) {
        if (this.hardwareRegisters.has(registerHandle)) {
            this.hardwareRegisters.get(registerHandle).setReadCallback(readCallback);
        } else {
            throw Error('Invalid register handle!');
        }
    }

    setRegisterWriteCallback(registerHandle: string, writeCallback: RegisterWriteCallback) {
        if (this.hardwareRegisters.has(registerHandle)) {
            this.hardwareRegisters.get(registerHandle).setWriteCallback(writeCallback);
        } else {
            throw Error('Invalid register handle!');
        }
    }

    requireCreateFile(hostHandle: string, contents: FileContents, description: string) {
        if (this.hosts.has(hostHandle)) {
            let requirement = new CreateFile(this,
                this.hosts.get(hostHandle), contents, description);
            this.goals.set(requirement.id, requirement);
        } else {
            throw Error('Invalid host handle!');
        }
    }

    requireMoveFile(fileHandle: string, hostHandle: string, description: string) {
        if (this.files.has(fileHandle)) {
            if (this.hosts.has(hostHandle)) {
                let requirement = new MoveFile(this,
                    this.files.get(fileHandle), this.hosts.get(hostHandle), description);
                this.goals.set(requirement.id, requirement);
            } else {
                throw Error('Invalid host handle!');
            }
        } else {
            throw Error('Invalid file handle!');
        }
    }

    requireChangeFile(fileHandle: string, contents: FileContents, description: string) {
        if (this.files.has(fileHandle)) {
            let requirement = new ChangeFile(this,
                this.files.get(fileHandle), contents, description);
            this.goals.set(requirement.id, requirement);
        } else {
            throw Error('Invalid file handle!');
        }
    }

    requireMoveAndChangeFile(fileHandle: string, hostHandle: string,
        contents: FileContents, description: string) {
        if (this.files.has(fileHandle)) {
            if (this.hosts.has(hostHandle)) {
                let requirement = new MoveAndChangeFile(this,
                    this.files.get(fileHandle), this.hosts.get(hostHandle), contents, description);
                this.goals.set(requirement.id, requirement);
            } else {
                throw Error('Invalid host handle!');
            }
        } else {
            throw Error('Invalid file handle!');
        }
    }

    requireDeleteFile(fileHandle: string, description: string) {
        if (this.files.has(fileHandle)) {
            let requirement = new DeleteFile(this,
                this.files.get(fileHandle), description);
            this.goals.set(requirement.id, requirement);
        } else {
            throw Error('Invalid file handle!');
        }
    }

    requireCustomGoal(description: string) {
        let requirement = new CustomGoal(this, description);
        this.goals.set(requirement.id, requirement);
        return requirement.id;
    }

    setCustomGoalCompleted(goalHandle: string) {
        if (this.goals.has(goalHandle)) {
            this.goals.get(goalHandle).setComplete();
        } else {
            throw Error('Invalid goal handle!');
        }
    }

    setCustomGoalFailed(goalHandle: string) {
        if (this.goals.has(goalHandle)) {
            this.goals.get(goalHandle).setFailed();
        } else {
            throw Error('Invalid goal handle!');
        }
    }

    mergeRequirements(requirementCount: Integer, description: string) {
        if (requirementCount <= this.goals.size) {
            this.goalGroups.push({
                description: description,
                requirements: [...this.goals.values()]
                    .slice(-requirementCount).map(requirement => requirement.id)
            });
        } else {
            throw Error('Attempting to merge too many goals!')
        }
    }

    createTable(title: string, x: number, y: number, description: string) {
        this.table = new Table(title, description, x, y);
    }

    addTableInput(label: string, values: RegisterValue[], registerHandle: string) {
        if (this.table !== undefined) {
            if (this.hardwareRegisters.has(registerHandle)) {
                this.table.appendColumn(new Input(label, values,
                    this.hardwareRegisters.get(registerHandle)));
            } else {
                throw Error('Invalid register handle!');
            }
        } else {
            throw Error('Table does not exist, call createTable() before adding columns.');
        }
    }

    addTableOutput(label: string, values: RegisterValue[], registerHandle: string) {
        if (this.table !== undefined) {
            if (this.hardwareRegisters.has(registerHandle)) {
                this.table.appendColumn(new Output(label, values,
                    this.hardwareRegisters.get(registerHandle)));
            } else {
                throw Error('Invalid register handle!');
            }
        } else {
            throw Error('Table does not exist, call createTable() before adding columns.');
        }
    }

    createWindow(title: string, x: number, y: number, width: Integer, height: Integer) {
        let window = new Window(title, x, y, width, height);
        this.windows.set(window.id, window);
        return window.id;
    }

    printWindow(windowHandle: string, text: string) {
        if (this.windows.has(windowHandle)) {
            this.windows.get(windowHandle).print(text);
        } else {
            throw Error('Invalid window handle!');
        }
    }

    clearWindow(windowHandle: string) {
        if (this.windows.has(windowHandle)) {
            this.windows.get(windowHandle).clear();
        } else {
            throw Error('Invalid window handle!');
        }
    }

    static randomInt(min: Integer, max: Integer) {
        return Math.round(Math.random() * (max - min)) + min as Integer;
    }

    static randomBool(probability: number) {
        return Math.random() < probability;
    }

    static randomChoice(array: any[]) {
        return array[Math.floor(Math.random() * array.length)];
    }

    static randomName() {
        return 'Jeff Bezos';
    }

    static randomAddress() {
        return '2111 7th Ave, Seattle, WA 98121, United States'
    }

    getPlayerHost() {
        return this.playerHost.id;
    }

    static convertTextToKeywords(text: string): Keyword[] {
        // TODO: Also split on punctuation
        let keywords: Keyword[] = text.split(' ').map(keyword => keyword as Keyword);
        return keywords;
    }

    static printConsole(object: any) {
        console.log(object);
    }
}
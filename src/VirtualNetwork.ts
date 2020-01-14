import Sval from 'sval';
// import * as faker from 'faker';
import { Level } from './Level';

class BuiltinGenerator {
    level: Level;
    builtins: { [key: string]: Function } = {};
    constants: { [key: string]: any } = {};

    constructor(level: Level) {
        this.level = level;

        // Hosts
        this.builtins['createHost'] = function (name: String, x: number, y: number, width: number, height: number) {
            if (![x, y, width, height].map(e => Number.isInteger(e)).reduce((a, b) => a && b, true)) {
                throw new Error('Invalid argument: x, y, width, and height must each be integers');
            }
            // TODO: X and Y are discarded, we should use them
            return this.createHost({ w: width, h: height }, name);
        }

        // Links
        this.constants['LINK_ID_NONE'] = 'LINK_ID_NONE';
        this.builtins['createLink'] = function (firstHostHandle: String, firstID: number, secondHostHandle: String, secondID: number) {
            if (![firstID, secondID].map(e => Number.isInteger(e)).reduce((a, b) => a && b, true)) {
                throw new Error('Invalid argument: firstID and secondID must each be integers');
            }

            return this.createLink(firstHostHandle, firstID, secondHostHandle, secondID);
        }
        this.builtins['modifyLink'] = function (linkHandle: string, firstID: number, secondID: number) {
            if (![firstID, secondID].map(e => Number.isInteger(e)).reduce((a, b) => a && b, true)) {
                throw new Error('Invalid argument: firstID and secondID must each be integers');
            }

            return this.modifyLink(linkHandle, firstID, secondID);
        }

        // TODO: Files
        this.constants['FILE_ICON_DATA'] = 'FILE_ICON_DATA';
        this.constants['FILE_ICON_TEXT'] = 'FILE_ICON_TEXT';
        this.constants['FILE_ICON_USER'] = 'FILE_ICON_USER';
        this.constants['FILE_ICON_ARCHIVE'] = 'FILE_ICON_ARCHIVE';
        this.constants['FILE_ICON_FOLDER'] = 'FILE_ICON_FOLDER';
        this.constants['FILE_ICON_SECURE'] = 'FILE_ICON_SECURE';
        this.constants['FILE_ICON_MOVIE'] = 'FILE_ICON_MOVIE';
        this.constants['FILE_ICON_MUSIC'] = 'FILE_ICON_MUSIC';
        this.builtins['createNormalFile'] = function (hostHandle: string, id: number, icon: string, contents: Array<string | number>) {
            if (!Number.isInteger(id)) {
                throw new Error('Invalid argument: id must be an integer');
            }

            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['createLockedFile'] = function (hostHandle: string, id: number, icon: string, contents: Array<string | number>) {
            if (!Number.isInteger(id)) {
                throw new Error('Invalid argument: id must be an integer');
            }
            
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['setFileColumnCount'] = function (fileHandle: string, columnCount: number) {
            if (!Number.isInteger(columnCount)) {
                throw new Error('Invalid argument: columnCount must be an integer');
            }

            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['setFileInitiallyCollapsed'] = function (fileHandle: string) {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }

        // TODO: Hardware Registers
        this.builtins['createRegister'] = function (hostHandle: string, x: number, y: number, name: string) {
            if (![x, y].map(e => Number.isInteger(e)).reduce((a, b) => a && b, true)) {
                throw new Error('Invalid argument: x and y must each be integers');
            }

            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['setRegisterReadCallback'] = function (registerHandle: string, readCallback: () => string | number) {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['setRegisterWriteCallback'] = function (registerHandle: string, writeCallback: () => string | number) {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }

        // TODO: Requirements
        // Or, EXISTENCE IS A CURSE SEND HELP I HAVE TO WRITE ALL OF THESE
        this.builtins['requireCreateFile'] = function (hostHandle: string, contents: Array<string | number>, description: string) {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['requireMoveFile'] = function (fileHandle: string, hostHandle: string, description: string) {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['requireChangeFile'] = function (fileHandle: string, contents: Array<string | number>, description: string) {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['requireMoveAndChangeFile'] = function (fileHandle: string, hostHandle: string, contents: Array<string | number>, description: string) {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['requireDeleteFile'] = function (fileHandle: string, description: string) {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['requireCustomGoal'] = function (description: string) {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['setCustomGoalCompleted'] = function (goalHandle: string) {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['setCustomGoalFailed'] = function (goalHandle: string) {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['mergeRequirements'] = function (requirementCount: number, description: string) {
            if (!Number.isInteger(requirementCount)) {
                throw new Error('Invalid argument: requirementCount must be an integer');
            }

            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }

        // TODO: Input / Output Tables
        this.builtins['createTable'] = function (title: string, x: number, y: number, description: string) {
            if (![x, y].map(e => Number.isInteger(e)).reduce((a, b) => a && b, true)) {
                throw new Error('Invalid argument: x and y must each be integers');
            }

            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['addTableInput'] = function (label: string, values: Array<string | number>, registerHandle: string) {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['addTableOutput'] = function (label: string, values: Array<string | number>, registerHandle: string) {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }

        // TODO: Output Windows
        this.builtins['createWindow'] = function (title: string, x: number, y: number, width: number, height: number) {
            if (![x, y, width, height].map(e => Number.isInteger(e)).reduce((a, b) => a && b, true)) {
                throw new Error('Invalid argument: x, y, width, and height must each be integers');
            }

            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['printWindow'] = function (windowHandle: string, text: string) {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }
        this.builtins['clearWindow'] = function (windowHandle: string) {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.'); // TODO: Implement this yet
        }

        // Random Generation
        this.builtins['randomInt'] = function (min: number, max: number) {
            if (![min, max].map(e => Number.isInteger(e)).reduce((a, b) => a && b, true)) {
                throw new Error('Invalid argument: min and max must each be integers');
            }

            return Math.round(Math.random() * (max - min)) + min;
        }
        this.builtins['randomBool'] = function (probability: number) {
            if (!(0 <= probability && probability <= 1)) {
                throw new Error('Invalid argument: probability must be between 0 and 1')
            }
            return Math.random() < probability;
        }
        this.builtins['randomChoice'] = function (choices: Array<any>) {
            return choices[Math.floor(Math.random() * choices.length)];
        }

        // TODO: Find an alternative for faker
        this.builtins['randomName'] = function () {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.');
            // return faker.name.findName();
        }
        this.builtins['randomAddress'] = function () {
            throw new Error('I, the developer, am a lazy piece of rope and haven\'t written this yet.');
            // return faker.address.streetAddress();
        }

        // Miscellaneous
        this.builtins['getPlayerHost'] = function () {
            return this.playerHostHandle;
        }
        this.builtins['convertTextToKeywords'] = function (text: string) {
            return text.split(' ');
        }
        this.builtins['printConsole'] = function (object: any) {
            console.log(object); // TODO: Make better?
        }
    }

    getBuiltins(): { [key: string]: Function } {
        let l = { ...this.builtins };
        Object.keys(l).forEach(e => l[e] = l[e].bind(this.level));
        return { ...l, ...this.constants };
    }
}

// A helper class that allows configuration and dynamic creation of Levels as defined in http://www.zachtronics.com/virtualnetwork
export class VirtualNetwork extends BuiltinGenerator {
    interpreter: Sval = new Sval({ sandBox: true });
    scope = new Proxy((this.interpreter as any).scope.context, {
        get: function (o, p) {
            if (p in o) {
                return o[p].value;
            } else {
                return undefined;
            }
        }
    });
    imported = false;

    constructor(level: Level) {
        super(level);
        this.interpreter.import('eval', undefined);
        this.interpreter.import(this.getBuiltins());
    }

    import(code: string) {
        if (!this.imported) {
            try {
                this.interpreter.run(code);
                return this.imported = true;
            } catch (err) {
                console.log(String(err));
                return this.imported = false;
            }
        } else {
            console.warn('Config may only be loaded into a VirtualNetwork once');
            return false;
        }
    }

    getMeta(): { title: String, subtitle: String, description: String } {
        if (this.imported) {
            return {
                title: this.scope.getTitle(),
                subtitle: this.scope.getSubtitle(),
                description: this.scope.getDescription()
            }
        } else {
            console.warn('Config must be imported before meta info can be queried')
        }
    }
}
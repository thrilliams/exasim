import { getQuickJS, getQuickJSSync } from 'quickjs-emscripten';
import Arena from 'quickjs-emscripten-sync';
import { Network } from './Network';

export class VirtualNetwork {
    network: Network;
    arena?: Arena;

    constructor() {
        this.network = new Network();
    }

    async initQuickJS() {
        await getQuickJS();
    }

    preRun() {
        this.arena = new Arena(getQuickJSSync().createVm());

        this.arena.expose(this.generateBindings());
        this.arena.evalCode(`function getTitle() {
            return "KEYWORD CONVERSION";
        }
        
        function getSubtitle() {
            return "A SIMPLE CHANGE";
        }
        
        function getDescription() {
            return "This file is supposed to have a FILENAME keyword in the header, but someone accidentally wrote it as ASCII bytes instead! Convert the first four bytes of the file into the corresponding keyword.";
        }
        
        function initializeTestRun(testRun) {
            const targetHost = createHost("target", 5, 0, 3, 3);
            createLink(targetHost, 800, getPlayerHost(), -1);
            const data = [];
            for (let i = 0; i < 10; i++) {
                let num = Math.pow(testRun*10 + i, 13) % (271*241*13);
                while (num > 0) {
                    data.push(Number(num%128));
                    num = Math.floor(num/128);
                }
            }
            printConsole(targetHost)
            const targetFile = createNormalFile(targetHost, 200, FILE_ICON_DATA, [72, 79, 77, 69].concat(data));
            requireChangeFile(targetFile, ['HOME'].concat(data), 'Change the header in file 200 to a keyword');
        }
        
        function onCycleFinished() {
        }`);

        this.network.setMeta(this.arena.evalCode('getTitle()'),
            this.arena.evalCode('getSubtitle()'),
            this.arena.evalCode('getDescription()'));
    }

    runCycle(n = 1) {
        this.network.reinitialize();
        this.arena.evalCode(`initializeTestRun(${n})`);
        // TODO: Run EXAs
        this.arena.evalCode('onCycleFinished()');

        console.log(this.network);
    }

    postRun() {
        this.arena.dispose();
    }

    generateBindings() {
        return {
            createHost: this.network.createHost.bind(this.network),
            createLink: this.network.createLink.bind(this.network),
            modifyLink: this.network.modifyLink.bind(this.network),
            createNormalFile: this.network.createNormalFile.bind(this.network),
            createLockedFile: this.network.createLockedFile.bind(this.network),
            setFileColumnCount: this.network.setFileColumnCount.bind(this.network),
            setFileInitiallyCollapsed: this.network.setFileInitiallyCollapsed.bind(this.network),
            createRegister: this.network.createRegister.bind(this.network),
            setRegisterReadCallback: this.network.setRegisterReadCallback.bind(this.network),
            setRegisterWriteCallback: this.network.setRegisterWriteCallback.bind(this.network),
            requireCreateFile: this.network.requireCreateFile.bind(this.network),
            requireMoveFile: this.network.requireMoveFile.bind(this.network),
            requireChangeFile: this.network.requireChangeFile.bind(this.network),
            requireMoveAndChangeFile: this.network.requireMoveAndChangeFile.bind(this.network),
            requireDeleteFile: this.network.requireDeleteFile.bind(this.network),
            requireCustomGoal: this.network.requireCustomGoal.bind(this.network),
            setCustomGoalCompleted: this.network.setCustomGoalCompleted.bind(this.network),
            setCustomGoalFailed: this.network.setCustomGoalFailed.bind(this.network),
            mergeRequirements: this.network.mergeRequirements.bind(this.network),
            createTable: this.network.createTable.bind(this.network),
            addTableInput: this.network.addTableInput.bind(this.network),
            addTableOutput: this.network.addTableOutput.bind(this.network),
            createWindow: this.network.createWindow.bind(this.network),
            printWindow: this.network.printWindow.bind(this.network),
            clearWindow: this.network.clearWindow.bind(this.network),
            randomInt: Network.randomInt,
            randomBool: Network.randomBool,
            randomChoice: Network.randomChoice,
            randomName: Network.randomName,
            randomAddress: Network.randomAddress,
            getPlayerHost: this.network.getPlayerHost.bind(this.network),
            convertTextToKeywords: Network.convertTextToKeywords,
            printConsole: Network.printConsole,
            FILE_ICON_DATA: 'FILE_ICON_DATA',
            FILE_ICON_TEXT: 'FILE_ICON_TEXT',
            FILE_ICON_USER: 'FILE_ICON_USER',
            FILE_ICON_ARCHIVE: 'FILE_ICON_ARCHIVE',
            FILE_ICON_FOLDER: 'FILE_ICON_FOLDER',
            FILE_ICON_SECURE: 'FILE_ICON_SECURE',
            FILE_ICON_MOVIE: 'FILE_ICON_MOVIE',
            FILE_ICON_MUSIC: 'FILE_ICON_MUSIC',
            LINK_ID_NONE: 'LINK_ID_NONE'
        }
    }
}
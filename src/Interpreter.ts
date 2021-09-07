import { RegisterManager } from './Registers';

export class Interpreter {
    static generateTokens(c: string): { instruction: string, arguments: { type: string, value: number | string }[] }[] {
        let code = c.split('\n');
        for (let i = 0; i < code.length; i++) {
            if (code[i].split(' ')[0] === '@REP') {
                code.splice(i, code.slice(i).indexOf('@END') + 1, ...this.resolveMacro(code.slice(i, i + 1 + code.slice(i).indexOf('@END'))));
                i = 0;
                continue;
            }
        }

        // Remove comments and blank spaces
        code = code.filter(e => e !== '' && !e.trim().startsWith('#'));

        // Tokenize
        let tokens: { instruction: string, arguments: { type: string, value: number | string }[] }[] = [];
        for (let i = 0; i < code.length; i++) {
            let t = code[i].split(' ');
            if (t[0] === 'MARK') {
                tokens[i] = { instruction: 'MARK', arguments: [{ type: 'label', value: t[1] }] }
            }
        }

        let labels = [...tokens].map(e => e.arguments[0].value)
        console.log(labels);
        for (let i = 0; i < code.length; i++) {
            let t = code[i].split(' ');
            // TODO: Check if instruction is valid
            if (t[0] !== 'MARK') {
                tokens[i] = {
                    instruction: t[0].toUpperCase(),
                    arguments: t.slice(1).map(e => {
                        if (t[0] === 'DATA') {
                            if (!isNaN(Number(e))) {
                                return {
                                    type: 'number', value: Number(e)
                                }
                            } else {
                                return {
                                    type: 'keyword', value: e
                                }
                            }
                        }

                        if (!isNaN(Number(e))) return {
                            type: 'number', value: Number(e)
                        }

                        if (e in RegisterManager.getRegisterPattern()) return { // TODO: Checking if is register should be better, make a class for holding registers
                            type: 'register', value: e
                        }

                        if (labels.includes(e)) return {
                            type: 'label', value: e
                        }

                        console.warn(`Unkown token type: ${e}`)
                        return {
                            type: 'unknown', value: e
                        }
                    })
                }
            }
        }

        // Parse and tokenize
        return tokens;
    }

    static resolveMacro(lines: string[]): string[] {
        if (lines[0].split(' ')[0] !== '@REP')
            throw new Error('Macros must begin on the first line');
        if (!Number.isInteger(Number(lines[0].split(' ')[1])))
            throw new Error('@REP only accepts integers for the paramater');
        if (lines.slice(-1)[0].split(' ')[0] !== '@END')
            throw new Error('Macros must end on the last line');

        let reps = Number(lines[0].split(' ')[1]);
        lines = lines.slice(1, -1);

        lines.forEach(l => {
            if (l.split(' ')[0] === '@REP' || l.split(' ')[0] === '@END')
                throw new Error('@REP directives cannot be nested.');
        })

        let fLines: string[] = [];
        for (let i = 0; i < reps; i++) {
            let c = lines.join('\n').split('@{');
            for (let j = 1; j < c.length; j++) {
                let s: number[] = c[j].slice(0, c[j].indexOf('}')).split(',').map(e => Number(e));
                c[j] = (s[0] + s[1] * i) + c[j].slice(c[j].indexOf('}') + 1);
            }
            fLines = [...fLines, ...c.join('').split('\n')]
        }
        return fLines;
    }

    instructions: { instruction: string, arguments: { type: string, value: number | string }[] }[];
    pointer = 0;

    constructor(code: string) {
        this.instructions = Interpreter.generateTokens(code);
    }

    getPointer(): number {
        return this.pointer;
    }

    setPointer(p: number) {
        this.pointer = p;
    }

    nextInstruction(): { instruction: string, arguments: { type: string, value: number | string }[] } {
        return this.instructions[this.pointer];
    }

    doNext() {
        console.log(this.instructions[this.pointer]);
        this.pointer++;
        // TODO: Something something execute code
    }
}
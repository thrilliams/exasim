export type Integer = number & { __int__: void };

export function roundToInteger(num: number): Integer {
    return Math.round(num) as Integer;
}

export function checkIsInteger(num: number): num is Integer {
    return Number.isInteger(num);
}

export function toInteger(value: string): Integer {
    return Number.parseInt(value) as Integer;
}

export function assertAsInteger(num: number): Integer {
    try {
        if (checkIsInteger(num)) {
            return num;
        }
    } catch (err) {
        throw new Error(`Invalid Integer value (error): ${num}`);
    }

    throw new Error(`Invalid Integer value: ${num}`);
}

export type Keyword = string & { __kw__: void };

export function checkIsKeyword(str: string): str is Keyword {
    return str.toUpperCase() === str;
}
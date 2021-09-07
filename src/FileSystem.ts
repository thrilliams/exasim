export default function loadFile(data: string, loadAsPath = false): string {
    if (loadAsPath) {
        if (globalThis.require) {
            return require('fs').readFileSync(data, 'utf8');
        } else {
            throw new Error('Paths are not yet supported in browser'); // TODO: Support paths in browser, probably virtual fs of some kind
        }
    } else {
        return data;
    }
}
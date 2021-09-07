import { VirtualNetwork } from './Network/VirtualNetwork'

(async () => {
    let vn = new VirtualNetwork();
    await vn.initQuickJS();
    vn.preRun();
    vn.runCycle();
    vn.postRun();
})()
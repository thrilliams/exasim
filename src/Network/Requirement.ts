import { Thing } from '../base/Thing';
import { Network } from './Network';

export type RequirementState = 'INCOMPLETE' | 'COMPLETE' | 'FAILED';
export type RequirementGroup = {
    description: string,
    requirements: string[]
}

export abstract class Requirement extends Thing {
    description: string;
    state: RequirementState;
    network: Network;

    constructor(network: Network, description: string) {
        super();

        this.network = network;
        this.description = description;
        this.state = 'INCOMPLETE';
    }

    checkComplete() { }

    setComplete() {
        this.state = 'COMPLETE';
    }

    setFailed() {
        this.state = 'FAILED';
    }
}
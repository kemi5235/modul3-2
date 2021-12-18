import { Entity } from "@subql/types";
export declare class VoteHistory implements Entity {
    constructor(id: string);
    id: string;
    proposalHashId?: string;
    approvedVote: boolean;
    councillorId?: string;
    votedYes?: number;
    votedNo?: number;
    block?: number;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<VoteHistory | undefined>;
    static create(record: any): VoteHistory;
}

// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class VoteHistory implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public proposalHashId?: string;

    public approvedVote: boolean;

    public councillorId?: string;

    public votedYes?: number;

    public votedNo?: number;

    public block?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save VoteHistory entity without an ID");
        await store.set('VoteHistory', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove VoteHistory entity without an ID");
        await store.remove('VoteHistory', id.toString());
    }

    static async get(id:string): Promise<VoteHistory | undefined>{
        assert((id !== null && id !== undefined), "Cannot get VoteHistory entity without an ID");
        const record = await store.get('VoteHistory', id.toString());
        if (record){
            return VoteHistory.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new VoteHistory(record.id);
        Object.assign(entity,record);
        return entity;
    }
}

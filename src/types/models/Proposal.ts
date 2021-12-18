// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Proposal implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public index: string;

    public account?: string;

    public hash?: string;

    public voteThreshold?: string;

    public block?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Proposal entity without an ID");
        await store.set('Proposal', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Proposal entity without an ID");
        await store.remove('Proposal', id.toString());
    }

    static async get(id:string): Promise<Proposal | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Proposal entity without an ID");
        const record = await store.get('Proposal', id.toString());
        if (record){
            return Proposal.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new Proposal(record.id);
        Object.assign(entity,record);
        return entity;
    }
}

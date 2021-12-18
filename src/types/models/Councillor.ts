// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Councillor implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public numberOfVotes?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Councillor entity without an ID");
        await store.set('Councillor', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Councillor entity without an ID");
        await store.remove('Councillor', id.toString());
    }

    static async get(id:string): Promise<Councillor | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Councillor entity without an ID");
        const record = await store.get('Councillor', id.toString());
        if (record){
            return Councillor.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new Councillor(record.id);
        Object.assign(entity,record);
        return entity;
    }
}

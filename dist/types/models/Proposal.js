"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proposal = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
class Proposal {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        assert_1.default(id !== null, "Cannot save Proposal entity without an ID");
        await store.set('Proposal', id.toString(), this);
    }
    static async remove(id) {
        assert_1.default(id !== null, "Cannot remove Proposal entity without an ID");
        await store.remove('Proposal', id.toString());
    }
    static async get(id) {
        assert_1.default((id !== null && id !== undefined), "Cannot get Proposal entity without an ID");
        const record = await store.get('Proposal', id.toString());
        if (record) {
            return Proposal.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        let entity = new Proposal(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.Proposal = Proposal;

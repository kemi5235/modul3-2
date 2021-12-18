"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteHistory = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
class VoteHistory {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        assert_1.default(id !== null, "Cannot save VoteHistory entity without an ID");
        await store.set('VoteHistory', id.toString(), this);
    }
    static async remove(id) {
        assert_1.default(id !== null, "Cannot remove VoteHistory entity without an ID");
        await store.remove('VoteHistory', id.toString());
    }
    static async get(id) {
        assert_1.default((id !== null && id !== undefined), "Cannot get VoteHistory entity without an ID");
        const record = await store.get('VoteHistory', id.toString());
        if (record) {
            return VoteHistory.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        let entity = new VoteHistory(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.VoteHistory = VoteHistory;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Councillor = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
class Councillor {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        assert_1.default(id !== null, "Cannot save Councillor entity without an ID");
        await store.set('Councillor', id.toString(), this);
    }
    static async remove(id) {
        assert_1.default(id !== null, "Cannot remove Councillor entity without an ID");
        await store.remove('Councillor', id.toString());
    }
    static async get(id) {
        assert_1.default((id !== null && id !== undefined), "Cannot get Councillor entity without an ID");
        const record = await store.get('Councillor', id.toString());
        if (record) {
            return Councillor.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        let entity = new Councillor(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.Councillor = Councillor;

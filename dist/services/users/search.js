"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchService = void 0;
const db_1 = __importDefault(require("../../db"));
exports.searchService = (q) => {
    return db_1.default.get('users').filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    }).value();
};
//# sourceMappingURL=search.js.map
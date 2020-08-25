"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const db_1 = __importDefault(require("../../db"));
exports.requireAuth = (req, res, next) => {
    if (!req.signedCookies.userId) {
        res.redirect('/auth/login');
        return;
    }
    let user = db_1.default.get('users').find({ id: req.signedCookies.userId }).value();
    if (!user) {
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = user;
    next();
};
//# sourceMappingURL=auth.middleware.js.map
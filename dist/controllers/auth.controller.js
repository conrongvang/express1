"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.login = void 0;
const md5_1 = __importDefault(require("md5"));
const db_1 = __importDefault(require("../db"));
const server_constant_1 = require("../constant/server-constant");
exports.login = (req, res) => {
    res.render('auth/login', { errors: server_constant_1.errors, values: server_constant_1.values });
};
exports.postLogin = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let user = db_1.default.get('users').find({ username: username }).value();
    if (!user) {
        res.render('auth/login', { errors: ['User does not exist.'], values: req.body });
        return;
    }
    let hashedPassword = md5_1.default(password);
    if (hashedPassword !== user.password) {
        res.render('auth/login', { errors: ['Wrong password.'], values: req.body });
        return;
    }
    res.cookie('userId', user.id, { signed: true });
    res.redirect('/users');
};
//# sourceMappingURL=auth.controller.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.postCreate = exports.create = exports.search = exports.index = void 0;
const server_constant_1 = require("../constant/server-constant");
const shortid_1 = __importDefault(require("shortid"));
const db_1 = __importDefault(require("../db"));
const search_1 = require("../services/users/search");
exports.index = function (req, res) {
    res.render('users/index', { users: db_1.default.get('users').value() });
};
exports.search = (req, res) => {
    let q = req.query.q;
    let matchedUsers = search_1.searchService(q);
    res.render('users/index', { users: matchedUsers });
};
exports.create = (req, res) => {
    console.log(req.cookies);
    res.render('users/create', { errors: server_constant_1.errors, values: server_constant_1.values }); // Or res.render('users/create', {errors, values});
};
exports.postCreate = (req, res) => {
    req.body.id = shortid_1.default.generate();
    db_1.default.get('users').push(req.body).write();
    res.redirect('/users');
};
exports.get = (req, res) => {
    let id = req.params.id;
    let user = db_1.default.get('users').find({ id: id }).value();
    res.render('users/view', { user: user });
};
// export const getEdit = (req: Request, res: Response) => {
//     let id = req.params.id;
//     let user = db.get('users').find({id: id}).value();
//     res.locals.user = user;
//     res.render('users/edit');
// };
// export const putEdit = (req: Request, res: Response) => {
//     let userId = req.params.id;
//     let user = db.get('users').find({userId: userId}).value();
//     user.name = req.body.name;
//     db.update(user, user.name, req.body).write();
//     res.redirect('/users');
// };
// export const delete = (req: Request, res: Response) => {
//     let id = req.params.id;
//     let user = db.get('users').find({id: id}).value();
//     db.unset(user).write();
//     res.rendeer('users/index');
// };
//# sourceMappingURL=user.controller.js.map
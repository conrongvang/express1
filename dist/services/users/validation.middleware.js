"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const db_1 = __importDefault(require("../../db"));
const server_constant_1 = require("../../constant/server-constant");
exports.validation = (req, res, next) => {
    if (!req.body.name)
        server_constant_1.errors.push("Name is required");
    req.body.name = req.body.name.trim();
    if (req.body.phone) {
        if (isNaN(Number(req.body.phone))) {
            server_constant_1.errors.push("Phone is required number type");
        }
        else {
            let matchedUsers = db_1.default.get('users').value().filter(user => user.phone.indexOf(req.body.phone) !== -1);
            if (matchedUsers.length !== 0) {
                if (req.body.phone === matchedUsers[0].phone)
                    server_constant_1.errors.push("Phone is existed");
            }
        }
        req.body.phone = req.body.phone.trim();
    }
    else
        server_constant_1.errors.push("Phone is required");
    if (server_constant_1.errors.length)
        return res.render('users/create', { errors: server_constant_1.errors, values: req.body });
    next();
};
//# sourceMappingURL=validation.middleware.js.map
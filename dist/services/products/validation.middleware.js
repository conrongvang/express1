"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const server_constant_1 = require("../../constant/server-constant");
exports.validation = (req, res, next) => {
    if (!req.body.name)
        server_constant_1.errors.push("Name is required");
    req.body.name = req.body.name.trim();
    if (isNaN(Number(req.body.price)))
        server_constant_1.errors.push("Price is required number type");
    req.body.price = req.body.price.trim();
    if (server_constant_1.errors.length)
        return res.render('products/create', { errors: server_constant_1.errors, values: req.body });
    next();
};
//# sourceMappingURL=validation.middleware.js.map
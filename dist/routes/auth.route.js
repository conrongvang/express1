"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router.route('/login').get(auth_controller_1.login)
    .post(auth_controller_1.postLogin);
exports.default = router;
//# sourceMappingURL=auth.route.js.map
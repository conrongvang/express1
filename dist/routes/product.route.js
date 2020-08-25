"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const validation_middleware_1 = require("../services/products/validation.middleware");
const router = express_1.default.Router();
router.get('/', product_controller_1.index);
// router.get('/cookie', (req: Request, res: Response, next: any) => {
//     res.cookie('user-id', 12345);
//     res.send('Hello World!');
// });
router.get('/search', product_controller_1.search);
router.route('/create').get(product_controller_1.create)
    .post(validation_middleware_1.validation, product_controller_1.postCreate);
router.get('/:id', product_controller_1.get);
exports.default = router;
//# sourceMappingURL=product.route.js.map
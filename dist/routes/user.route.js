"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
const validation_middleware_1 = require("../services/users/validation.middleware");
router.get('/', user_controller_1.index);
router.get('/cookie', (req, res, next) => {
    res.cookie('user-id', 12345);
    res.send('Hello World!');
});
router.get('/search', user_controller_1.search);
// router.get('/create', controller.create);
// router.post('/create', validate.postCreate, controller.postCreate);
router.route('/create').get(user_controller_1.create)
    .post(validation_middleware_1.validation, user_controller_1.postCreate);
router.get('/:id', user_controller_1.get);
// router.route('/edit/:id').get(controller.getEdit)
//                          .put(controller.putEdit);
// router.delete('/delete/:id', controller.delete);
exports.default = router;
//# sourceMappingURL=user.route.js.map
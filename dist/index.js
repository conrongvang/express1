"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const product_route_1 = __importDefault(require("./routes/product.route"));
const server_constant_1 = require("./constant/server-constant");
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const auth_middleware_1 = require("./services/auth/auth.middleware");
// const userRoute = require('./routes/user.route');
// const authMiddleware = require('./db/services/auth/auth.middleware');
const app = express_1.default();
const http = require('http').createServer(app);
const port = 3001;
app.set('views', 'src/views/');
app.set('view engine', 'ejs');
//app.set('views', './views');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.redirect('/products');
});
app.use((req, res, next) => {
    res.locals.user = server_constant_1.user;
    next();
});
app.use('/products', product_route_1.default);
app.use('/auth', auth_route_1.default);
app.use('/users', auth_middleware_1.requireAuth, user_route_1.default);
http.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
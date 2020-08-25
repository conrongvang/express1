require('dotenv').config();

import express, {Request, Response} from 'express';
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

import productRouter from './routes/product.route';
import {user} from './constant/server-constant';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import {requireAuth} from './services/auth/auth.middleware';
// const userRoute = require('./routes/user.route');

// const authMiddleware = require('./db/services/auth/auth.middleware');

const app = express();
const http = require('http').createServer(app);
const port = 3001;

app.set('views', 'src/views/');
app.set('view engine', 'ejs');
//app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
    res.redirect('/products');
});

app.use((req: Request, res: Response, next: any) => {
    res.locals.user = user;
    next();
});

app.use('/products', productRouter);
app.use('/auth', authRouter);
app.use('/users', requireAuth, userRouter);

http.listen(port, () => {
    console.log( `Server started at http://localhost:${ port }` );
});
import express from 'express';
import {login, postLogin} from '../controllers/auth.controller';

const router = express.Router();

router.route('/login').get(login)
                      .post(postLogin);

export default router;
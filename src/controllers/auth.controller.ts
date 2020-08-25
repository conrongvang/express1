import {Request, Response} from 'express';
import md5 from 'md5';
import db from '../db';
import {errors, values} from '../constant/server-constant';

export const login = (req: Request, res: Response) => {
    res.render('auth/login', {errors: errors, values: values});
};

export const postLogin = (req: Request, res: Response) => {
    let username = req.body.username;
    let password = req.body.password;
    let user = db.get('users').find({username: username}).value();
    if(!user) {
        res.render('auth/login', {errors: ['User does not exist.'], values: req.body});
        return;
    }
    let hashedPassword = md5(password);
    if(hashedPassword !== user.password) {
        res.render('auth/login', {errors: ['Wrong password.'], values: req.body});
        return;
    }
    res.cookie('userId', user.id, {signed: true});
    res.redirect('/users');
};
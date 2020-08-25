import {Request, Response} from 'express';
import db from '../../db';

export const requireAuth = (req: Request, res: Response, next: any) => {
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    let user = db.get('users').find({id: req.signedCookies.userId}).value();
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = user;
    next();
};
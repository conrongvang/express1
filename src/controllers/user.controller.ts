import {Request, Response} from 'express';
import {errors, values} from '../constant/server-constant';
import shortId from 'shortid';
import db from '../db';
import {searchService} from '../services/users/search';

export const index = function (req: Request, res: Response) {
    res.render('users/index', {users: db.get('users').value()});
};

export const search = (req: Request, res: Response) => {
    let q = req.query.q;
    let matchedUsers = searchService(q);
    res.render('users/index', { users: matchedUsers });
};

export const create = (req: Request, res: Response) => {
    console.log(req.cookies);
    res.render('users/create', {errors: errors, values: values}); // Or res.render('users/create', {errors, values});
};

export const postCreate = (req: Request, res: Response) => {
    req.body.id = shortId.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
};

export const get = (req: Request, res: Response) => {
    let id = req.params.id;
    let user = db.get('users').find({id: id}).value();
    res.render('users/view', {user: user});
};

// export const getEdit = (req: Request, res: Response) => {
//     let id = req.params.id;
//     let user = db.get('users').find({id: id}).value();
//     res.locals.user = user;
//     res.render('users/edit');
// };

// export const putEdit = (req: Request, res: Response) => {
//     let userId = req.params.id;
//     let user = db.get('users').find({userId: userId}).value();
//     user.name = req.body.name;
//     db.update(user, user.name, req.body).write();
//     res.redirect('/users');
// };

// export const delete = (req: Request, res: Response) => {
//     let id = req.params.id;
//     let user = db.get('users').find({id: id}).value();
//     db.unset(user).write();
//     res.rendeer('users/index');
// };
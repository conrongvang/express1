import {Request, Response} from 'express';
import db from '../../db';
import {errors, values} from '../../constant/server-constant';

export const validation = (req: Request, res: Response, next: any) => {
    if(!req.body.name) errors.push("Name is required");
    req.body.name = req.body.name.trim();
    if(req.body.phone) {
        if(isNaN(Number(req.body.phone))) {
            errors.push("Phone is required number type");
        }
        else {
            let matchedUsers = db.get('users').value().filter(user => user.phone.indexOf(req.body.phone) !== -1);
            if(matchedUsers.length !== 0) {
                if(req.body.phone === matchedUsers[0].phone) errors.push("Phone is existed");
            }
        }
        req.body.phone = req.body.phone.trim();
    }
    else errors.push("Phone is required");
    if(errors.length)
        return res.render('users/create', {errors: errors, values: req.body});
    next();
};
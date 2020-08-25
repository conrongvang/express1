import {Request, Response} from 'express';
import db from '../../db';
import {errors, values} from '../../constant/server-constant';

export const validation = (req: Request, res: Response, next: any) => {
    if(!req.body.name) errors.push("Name is required");
    req.body.name = req.body.name.trim();
    if(isNaN(Number(req.body.price))) errors.push("Price is required number type");
    req.body.price = req.body.price.trim();
    if(errors.length)
        return res.render('products/create', {errors: errors, values: req.body});
    next();
};
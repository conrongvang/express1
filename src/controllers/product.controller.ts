import {Request, Response} from 'express';
import {errors, values} from '../constant/server-constant';
import shortId from 'shortid';
import db from '../db';

export const index = function (req: Request, res: Response) {
    let page = parseInt(req.query.page as string) || 1;
    let perPage = 8;
    let start = (page - 1) * perPage;
    let end = page * perPage;
    let nextPage: number;
    let previousPage: number;
    const firstPage = 1;
    let count = 0;
    let products = [];

    if(req.query.search) {
        var search = req.query.search;
        products = db.get('products').filter((product) => {
            return product.name.toLowerCase().indexOf(search) !== -1;
        }).value();
    }
    else {
        products = db.get('products').value();
    }

    products.forEach(() => {
        count++;
    });
    let numberPage = Math.floor(count/perPage) + 1;
    if(page > 0) {
        previousPage = page - 1;
        if(previousPage <= 0) previousPage = 0;
    }
    else{
        page = 1;
    }
    if(page < numberPage) {
        nextPage = page + 1;
    }
    else{
        nextPage = numberPage;
    }

    res.render('products/index', {
        products: products.slice(start, end),
        page: page,
        nextPage: nextPage,
        previousPage: previousPage,
        firstPage: firstPage,
        lastPage: numberPage,
        search: search
    });
};

// export const search = (req: Request, res: Response) => {
//     let q = req.query.q;                                                // This is
//     let matchedProducts = db.get('products').filter((product) => {      // for
//         return product.name.toLowerCase().indexOf(q) !== -1;            // SEARCH
//     }).value();                                                         //

//     let page = parseInt(req.query.page as string) || 1;                 // From 
//     let perPage = 8;                                                    // here
//     let start = (page - 1) * perPage;                                   // to
//     let end = page * perPage;                                           // end
//     let nextPage: number;                                               // for
//     let previousPage: number;                                           // PAGINATION
//     let firstPage = 1;                                                  //
//                                                                         //
//     let count = 0;                                                      //
//     matchedProducts.forEach(() => {                                     //
//         count++;                                                        //
//     });                                                                 //
//     let numberPage = Math.ceil(count/perPage);                          //
//     if(page > 0) {                                                      //
//         previousPage = page - 3;                                        //
//         if(previousPage <= 0) previousPage = 1;                         //
//     }                                                                   //
//     if(page < numberPage) {                                             //
//         nextPage = page + 1;                                            //
//     }                                                                   //

//     res.render('products/index', {                                      //
//         products: matchedProducts.slice(start, end),                    //
//         page: page,                                                     //
//         nextPage: nextPage,                                             //
//         previousPage: previousPage,                                     //
//         firstPage: firstPage,                                           //
//         lastPage: numberPage,                                           //
//         q: q                                                            //
//     });                                                                 //
// };

export const create = (req: Request, res: Response) => {
    res.render('products/create', {errors: errors, values: values});
};

export const postCreate = (req: Request, res: Response) => {
    req.body.id = shortId.generate();
    db.get('products').push(req.body).write();
    res.redirect('/products');
};

export const get = (req: Request, res: Response) => {
    let id = req.params.id;
    let product = db.get('products').find({id: id}).value();
    res.render('products/view', {product: product});
};
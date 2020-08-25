"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.postCreate = exports.create = exports.search = exports.index = void 0;
const server_constant_1 = require("../constant/server-constant");
const shortid_1 = __importDefault(require("shortid"));
const db_1 = __importDefault(require("../db"));
exports.index = function (req, res) {
    let page = parseInt(req.query.page) || 1;
    let perPage = 8;
    let start = (page - 1) * perPage;
    let end = page * perPage;
    let products = db_1.default.get('products').value();
    let count = 0;
    products.forEach(() => {
        count++;
    });
    let numberPage = Math.floor(count / perPage) + 1;
    let nextPage;
    let previousPage;
    let firstPage = 1;
    if (page > 0) {
        previousPage = page - 3;
        if (previousPage <= 0)
            previousPage = 1;
    }
    if (page < numberPage) {
        nextPage = page + 1;
    }
    res.render('products/index', {
        products: db_1.default.get('products').value().slice(start, end),
        page: page,
        nextPage: nextPage,
        previousPage: previousPage,
        firstPage: firstPage,
        lastPage: numberPage
    });
};
exports.search = (req, res) => {
    let q = req.query.q; // This is
    let matchedProducts = db_1.default.get('products').filter((product) => {
        return product.name.toLowerCase().indexOf(q) !== -1; // SEARCH
    }).value(); //
    let page = parseInt(req.query.page) || 1; // From 
    let perPage = 8; // here
    let start = (page - 1) * perPage; // to
    let end = page * perPage; // end
    let nextPage; // for
    let previousPage; // PAGINATION
    let firstPage = 1; //
    //
    let count = 0; //
    matchedProducts.forEach(() => {
        count++; //
    }); //
    let numberPage = Math.ceil(count / perPage); //
    if (page > 0) { //
        previousPage = page - 3; //
        if (previousPage <= 0)
            previousPage = 1; //
    } //
    if (page < numberPage) { //
        nextPage = page + 1; //
    } //
    res.render('products/index', {
        products: matchedProducts.slice(start, end),
        page: page,
        nextPage: nextPage,
        previousPage: previousPage,
        firstPage: firstPage,
        lastPage: numberPage,
        q: q //
    }); //
};
exports.create = (req, res) => {
    res.render('products/create', { errors: server_constant_1.errors, values: server_constant_1.values });
};
exports.postCreate = (req, res) => {
    req.body.id = shortid_1.default.generate();
    db_1.default.get('products').push(req.body).write();
    res.redirect('/products');
};
exports.get = (req, res) => {
    let id = req.params.id;
    let product = db_1.default.get('products').find({ id: id }).value();
    res.render('products/view', { product: product });
};
//# sourceMappingURL=product.controller.js.map
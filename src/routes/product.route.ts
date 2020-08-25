import express, {Request, Response} from 'express';
import {index, create, postCreate, get} from '../controllers/product.controller';
import {validation} from '../services/products/validation.middleware';

const router = express.Router();

router.get('/', index);
// router.get('/cookie', (req: Request, res: Response, next: any) => {
//     res.cookie('user-id', 12345);
//     res.send('Hello World!');
// });
// router.get('/search', search);
router.route('/create').get(create)
                       .post(validation, postCreate);
router.get('/:id', get);

export default router;
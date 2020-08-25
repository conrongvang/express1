import express, {Request, Response} from 'express';
import {index, create, postCreate, search, get} from '../controllers/user.controller';
const router = express.Router();

import {validation} from '../services/users/validation.middleware';

router.get('/', index);
router.get('/cookie', (req: Request, res: Response, next: any) => {
    res.cookie('user-id', 12345);
    res.send('Hello World!');
});
router.get('/search', search);
// router.get('/create', controller.create);
// router.post('/create', validate.postCreate, controller.postCreate);
router.route('/create').get(create)
                       .post(validation, postCreate);
router.get('/:id', get);
// router.route('/edit/:id').get(controller.getEdit)
//                          .put(controller.putEdit);
// router.delete('/delete/:id', controller.delete);


export default router;
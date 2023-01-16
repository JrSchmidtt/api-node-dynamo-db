import express from 'express';
import PingController from '../controllers/PingController';
import BookController from '../controllers/BookController';

const router = express.Router();

router.get('/ping', PingController.index);
router.get('/book', BookController.index);
router.post('/book', BookController.create);
router.get('/book/:id', BookController.show);
router.delete('/book/:id', BookController.delete);

export default router;
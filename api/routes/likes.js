import express from 'express';
import { getLikes, addLike, cancelLike } from '../controllers/like.js';

const router = express.Router();

router.get('/', getLikes);
router.post('/', addLike);
router.delete('/', cancelLike);

export default router;
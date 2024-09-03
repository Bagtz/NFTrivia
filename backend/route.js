import express from 'express';

import { addAnswer } from './backcontroller.js';

const router = express.Router();

router.post('/add-answer', addAnswer);

export default router;
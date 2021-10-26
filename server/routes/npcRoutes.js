import express from 'express';
import { getNPC, createNPC, deleteNPC, updateNPC } from '../controller/npcController.js';

const router = express.Router();

router.post('/', getNPC);
router.post('/', createNPC);
router.delete('/:id', deleteNPC);
router.put('/:id', updateNPC);

export default router;
import { Router } from 'express';
import {
  addChapter, chapterValidators,
  updateChapter,
  deleteChapter,
  reorderChapter,
  addBlock,
  removeBlock,
  getChaptersByCourse,
} from '../controllers/chapter.controller.js';
import { protectAdmin } from '../middleware/admin.middleware.js';
import validate from '../middleware/validate.middleware.js';

const router = Router();

router.use(protectAdmin);

router.get('/courses/:courseId', getChaptersByCourse);
router.post('/courses/:courseId/chapters', chapterValidators, validate, addChapter);
router.put('/:id', updateChapter);
router.delete('/:id', deleteChapter);
router.patch('/:id/reorder', reorderChapter);
router.post('/:id/blocks', addBlock);
router.delete('/:id/blocks/:refId', removeBlock);

export default router;

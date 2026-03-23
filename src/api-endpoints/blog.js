import express from 'express';
import ArticleManager from '../handlers/ArticleManager.js';
import { entryValidationRules, entryUpdateRules } from '../interceptors/validators.js';

const router = express.Router();

router.post('/entries', entryValidationRules(), ArticleManager.registerEntry);
router.get('/entries', ArticleManager.listAll);
router.get('/entries/search', ArticleManager.findByKeywords);
router.get('/entries/:id', ArticleManager.getOne);
router.put('/entries/:id', entryUpdateRules(), ArticleManager.updateExisting);
router.delete('/entries/:id', ArticleManager.removeEntry);

export default router;

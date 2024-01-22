const express = require('express');
const questionBankController=require('../Controllers/questionBankController');
const router = express.Router();
    router.get('/fetchQuestions',questionBankController.fetchQuestions);
    router.post('/addQuestions',questionBankController.addQuestions);
    router.get('/fetchSpecificQuestions/:languageType', questionBankController.fetchQuestionsByLanguageType);

module.exports = router;
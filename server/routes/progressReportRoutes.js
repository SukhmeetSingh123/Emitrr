const express = require('express');
const fetchuser = require('../Middleware/fetchUserMiddleware')
const progressReportController=require('../Controllers/progressReportController');
const router = express.Router();
router.get('/fetchReport',fetchuser,progressReportController.fetchReport);
router.post('/addReport',fetchuser,progressReportController.addReport);
router.put('/updateReport/:id',fetchuser,progressReportController.updateReport);
module.exports = router;
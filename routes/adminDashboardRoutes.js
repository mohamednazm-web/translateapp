const express = require('express');
const adminDashboardController = require('../controllers/adminDashboardController');

const router = express.Router();

router
  .route('/')
  .post(adminDashboardController.createProductWithAdminDashboard);
router
  .route('/delete-product')
  .post(adminDashboardController.deleteProductWithAdminDashboard);
router
  .route('/delete-quiz')
  .post(adminDashboardController.deleteQuizWithAdminDashboard);
router
  .route('/getAllQuizes')
  .get(adminDashboardController.getAllQuizesWithAdminDashboard);
router
  .route('/update/:id')
  .post(adminDashboardController.updateProductWithAdminDashboard);

router.route('/quiz').post(adminDashboardController.createQuiz);

module.exports = router;

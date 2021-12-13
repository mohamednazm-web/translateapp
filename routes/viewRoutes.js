const express = require('express');
const viewsController = require('../controllers/viewsController');
const verify = require('./verifyToken');

const router = express.Router();
router.get('/', viewsController.home);
router.get('/admin_dashboard', verify, viewsController.adminDashboard);
router.get(
  '/admin_dashboard/products',
  verify,
  viewsController.productsOfdashboard
);
router.get(
  '/admin_dashboard/add-product',
  verify,
  viewsController.addProductWithAdminDashboard
);
router.get(
  '/admin_dashboard/add-question',
  verify,
  viewsController.addQuestionWithAdminDashboard
);
router.get(
  '/admin_dashboard/update-product/:id',
  verify,
  viewsController.updateProductWithAdminDashboard
);

module.exports = router;

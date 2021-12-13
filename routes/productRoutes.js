const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router
  .route('/')
  .get(productsController.getAllProducts)
  .post(productsController.createProduct);
router
  .route('/:id')
  .get(productsController.getProduct)
  .delete(productsController.deleteProduct)
  .put(productsController.updateProductWithAdminDashboard);

router.get('/alphabetic', productsController.getAllAlphabetic);
router.get('/numbers', productsController.getAllNumbers);
router.get('/countries', productsController.getAllCountries);
router.get('/time', productsController.getAllTime);
router.get('/colors', productsController.getAllColors);
router.get('/food', productsController.getAllFood);
router.get('/days', productsController.getAllDays);
router.get('/bodyparts', productsController.getAllBodyParts);
router.get('/animals', productsController.getAllAnimals);

router.route('/recentProducts').get(productsController.getRecentProducts);

module.exports = router;

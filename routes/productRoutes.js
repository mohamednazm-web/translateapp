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

router.post('/isFavorite', productsController.isFavorite);

router.get('/alphabetic', productsController.getAllAlphabetic);
router.get('/numbers', productsController.getAllNumbers);
router.get('/countries', productsController.getAllCountries);
router.get('/time', productsController.getAllTime);
router.get('/colors', productsController.getAllColors);
router.get('/food', productsController.getAllFood);
router.get('/days', productsController.getAllDays);
router.get('/bodyparts', productsController.getAllBodyParts);
router.get('/animals', productsController.getAllAnimals);
router.get('/nouns', productsController.getAllNouns);
router.get('/adverbs', productsController.getAllAdverbs);
router.get('/adjectives', productsController.getAllAdjectives);
router.get('/commonPhraces', productsController.getAllCommonPhrases);
router.get('/wordOfTheDay', productsController.getAllWordOfTheDay);

router.route('/recentProducts').get(productsController.getRecentProducts);

module.exports = router;

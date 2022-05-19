const { ObjectID } = require('mongodb');
const Product = require('./../models/productModel');
const Categories = require('./../models/categoriesModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

// Get Recent Products for shop
exports.isFavorite = catchAsync(async (req, res, next) => {
  // db.collection('user').update({'_id':ObjectID(req.session.loggedIn)}, {$set: {image : filename}}, {w:1}, function(err, result){}
  const updateProduct = await Product.update(
    { _id: ObjectID(req.body.id) },
    { $set: { isFavorite: req.body.isFavorite } }
  );

  console.log(updateProduct);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: updateProduct.length,
    data: {
      recentProducts: updateProduct
    }
  });
});

// Get Recent Products for shop
exports.getRecentProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find()
    .populate('categories')
    .sort({ _id: -1 })
    .limit(3); //-_id

  //console.log(products);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      recentProducts: products
    }
  });
});

// Get Recent Products for shop
exports.getAllAlphabetic = catchAsync(async (req, res, next) => {
  let alphabetic;
  const carAlphabeticCategorey = await Categories.find({
    name: { $eq: 'alphabetic' }
  })
    .populate('products')
    .sort({ _id: -1 });
  carAlphabeticCategorey.forEach(function(categorey) {
    alphabetic = categorey.products.reverse().slice(0, 20);
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: alphabetic.length,
    data: {
      alphabetic: alphabetic
    }
  });
});

// Get Recent Products for shop
exports.getAllCommonPhrases = catchAsync(async (req, res, next) => {
  let commonPhrases;
  const carAlphabeticCommonPhrases = await Categories.find({
    name: { $eq: 'commonPhraces' }
  })
    .populate('products')
    .sort({ _id: -1 });
  carAlphabeticCommonPhrases.forEach(function(categorey) {
    commonPhrases = categorey.products.reverse().slice(0, 20);
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: commonPhrases.length,
    data: {
      commonPhrases: commonPhrases
    }
  });
});

// Get Recent Products for shop
//Get Recent Products for shop
exports.getAllWordOfTheDays = catchAsync(async (req, res, next) => {
  let wordOfTheDay;
  const carWordOfTheDays = await Categories.find({
    name: { $eq: 'wordOfTheDay' }
  })
    .populate('products')
    .sort({ _id: -1 });
  carWordOfTheDays.forEach(function(categorey) {
    wordOfTheDay = categorey.products.reverse().slice(0, 20);
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: wordOfTheDay.length,
    data: {
      wordOfTheDay: wordOfTheDay
    }
  });
});
exports.getAllNumbers = catchAsync(async (req, res, next) => {
  let numbers;
  const numbersCategorey = await Categories.find({
    name: { $eq: 'numbers' }
  })
    .populate('products')
    .sort({ _id: -1 });
  numbersCategorey.forEach(function(categorey) {
    numbers = categorey.products.reverse().slice(0, 20);
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: numbers.length,
    data: {
      numbers: numbers
    }
  });
});

exports.getAllCountries = catchAsync(async (req, res, next) => {
  let countries;
  const countriesCategorey = await Categories.find({
    name: { $eq: 'countries' }
  })
    .populate('products')
    .sort({ _id: -1 });
  countriesCategorey.forEach(function(categorey) {
    countries = categorey.products.reverse().slice(0, 20);
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: countries.length,
    data: {
      countries: countries
    }
  });
});

exports.getAllTime = catchAsync(async (req, res, next) => {
  let time;
  const timeCategorey = await Categories.find({
    name: { $eq: 'time' }
  })
    .populate('products')
    .sort({ _id: -1 });
  timeCategorey.forEach(function(categorey) {
    time = categorey.products.reverse().slice(0, 20);
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: time.length,
    data: {
      time: time
    }
  });
});

exports.getAllColors = catchAsync(async (req, res, next) => {
  let colors;
  const colorsCategorey = await Categories.find({
    name: { $eq: 'colors' }
  })
    .populate('products')
    .sort({ _id: -1 });
  colorsCategorey.forEach(function(categorey) {
    colors = categorey.products.reverse().slice(0, 20);
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: colors.length,
    data: {
      colors: colors
    }
  });
});

exports.getAllFood = catchAsync(async (req, res, next) => {
  let food;
  const foodCategorey = await Categories.find({
    name: { $eq: 'food' }
  })
    .populate('products')
    .sort({ _id: -1 });
  foodCategorey.forEach(function(categorey) {
    food = categorey.products.reverse().slice(0, 20);
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: food.length,
    data: {
      food: food
    }
  });
});

exports.getAllDays = catchAsync(async (req, res, next) => {
  let days;
  const daysCategorey = await Categories.find({
    name: { $eq: 'days' }
  })
    .populate('products')
    .sort({ _id: -1 });
  daysCategorey.forEach(function(categorey) {
    days = categorey.products.reverse().slice(0, 20);
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: days.length,
    data: {
      days: days
    }
  });
});

exports.getAllBodyParts = catchAsync(async (req, res, next) => {
  let bodyparts;
  const bodypartsCategorey = await Categories.find({
    name: { $eq: 'bodyparts' }
  })
    .populate('products')
    .sort({ _id: -1 });
  bodypartsCategorey.forEach(function(categorey) {
    bodyparts = categorey.products.reverse().slice(0, 20);
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: bodyparts.length,
    data: {
      bodyparts: bodyparts
    }
  });
});

exports.getAllAnimals = catchAsync(async (req, res, next) => {
  let animals;
  const animalsCategorey = await Categories.find({
    name: { $eq: 'animals' }
  })
    .populate('products')
    .sort({ _id: -1 });
  animalsCategorey.forEach(function(categorey) {
    animals = categorey.products.reverse().slice(0, 20);
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: animals.length,
    data: {
      animals: animals
    }
  });
});

exports.getAllNouns = catchAsync(async (req, res, next) => {
  let Nouns;
  const nounsCategorey = await Categories.find({
    name: { $eq: 'Noun' }
  })
    .populate('products')
    .sort({ _id: -1 });
  nounsCategorey.forEach(function(categorey) {
    Nouns = categorey.products.reverse().slice(0, 20);
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: Nouns.length,
    data: {
      Nouns: Nouns
    }
  });
});

exports.getAllAdverbs = catchAsync(async (req, res, next) => {
  let adverbs;
  const adverbsCategorey = await Categories.find({
    name: { $eq: 'adverb' }
  })
    .populate('products')
    .sort({ _id: -1 });
  adverbsCategorey.forEach(function(categorey) {
    adverbs = categorey.products.reverse().slice(0, 20);
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: adverbs.length,
    data: {
      adverbs: adverbs
    }
  });
});

exports.getAllAdjectives = catchAsync(async (req, res, next) => {
  let adjectives;
  const adjectivesCategorey = await Categories.find({
    name: { $eq: 'adjective' }
  })
    .populate('products')
    .sort({ _id: -1 });
  adjectivesCategorey.forEach(function(categorey) {
    adjectives = categorey.products.reverse().slice(0, 20);
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: adjectives.length,
    data: {
      adjectives: adjectives
    }
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  await Categories.updateMany(
    { _id: newProduct.categories },
    { $push: { products: newProduct._id } }
  );

  res.status(201).json({
    // 201 stands for to create new product
    status: 'success',
    data: {
      data: newProduct
    }
  });
});

exports.updateProductWithAdminDashboard = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  //const product = await Product.findOne({ _id });
  const { title, categories, subtitle, voice } = req.body;
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  //console.log(oldCategoryId);

  const doc = await Categories.updateOne(
    {
      products: {
        _id: id
      }
    },
    {
      $set: {
        title: title,
        subtitle: subtitle,
        categories: categories,
        voice: voice
      }
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      newProduct: updateProduct,
      newCategory: doc
    }
  });
});

exports.getProduct = factory.getOne(Product);
exports.getAllProducts = factory.getAll(Product);
//exports.createProduct = factory.createOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
//exports.updateProduct = factory.updateOne(Product);

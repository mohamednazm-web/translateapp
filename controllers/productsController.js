const Product = require('./../models/productModel');
const Categories = require('./../models/categoriesModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

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
  }).populate('products');
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

exports.getAllNumbers = catchAsync(async (req, res, next) => {
  let numbers;
  const numbersCategorey = await Categories.find({
    name: { $eq: 'numbers' }
  }).populate('products');
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
  }).populate('products');
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
  }).populate('products');
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
  }).populate('products');
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
  }).populate('products');
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
  }).populate('products');
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
  }).populate('products');
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
  }).populate('products');
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
  const id = req.params.id;
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

  const oldCategoryId = updateProduct.categories._id;
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

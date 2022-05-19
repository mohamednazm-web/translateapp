const Product = require('./../models/productModel');
const Categories = require('./../models/categoriesModel');
const Quiz = require('./../models/quizModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const fileHelper = require('../utils/file');
const fs = require('fs');
const Quizes = require('./../models/quizModel');

const ITEMS_PER_PAGE = 8;

exports.createProductWithAdminDashboard = async (req, res, next) => {
  const i18n = res.setLocale(req.cookies.i18n);
  const title = req.body.title; // for kurdish
  const subtitle = req.body.subtitle;
  const voice = req.body.voice;
  const categories = req.body.categories;

  const product = new Product({
    title: title,
    subtitle: subtitle,
    voice: voice,
    categories: categories
  });

  const newProduct = await Product.create(product);

  const doc = await Categories.updateMany(
    { _id: newProduct.categories },
    { $push: { products: newProduct._id } }
  );

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  } else {
    req.flash('messageSuccessAdd', 'ئەم بەرهەمە بەسەرکەوتوویی زیادکرا');
    res.redirect('back');
  }
};

exports.createQuiz = async (req, res, next) => {
  const {
    title,
    choice1,
    choice2,
    choice3,
    choice4,
    right1,
    right2,
    right3,
    right4,
    categories
  } = req.body;

  const rightChoices = [right1, right2, right3, right4];
  let numberOfCorrectAnswer = 0;
  rightChoices.forEach(choice => {
    if (choice === 'on') {
      // eslint-disable-next-line no-plusplus
      numberOfCorrectAnswer++;
    }
  });

  if (numberOfCorrectAnswer > 1) {
    req.flash('messageDangerAdd', 'please choose one as correct answer');
  }

  const answers = {
    a1: { a: choice1, i: right1 === 'on' ? 1 : 0 },
    a2: { a: choice2, i: right2 === 'on' ? 1 : 0 },
    a3: { a: choice3, i: right3 === 'on' ? 1 : 0 },
    a4: { a: choice4, i: right4 === 'on' ? 1 : 0 }
  };

  const quiz = new Quiz({
    question: title,
    quizType: categories,
    ...answers
  });

  const newQuiz = await Quiz.create(quiz);
  console.log(newQuiz);
  if (newQuiz) {
    req.flash('messageSuccessAdd', 'New quiz added successfully');
    res.redirect('back');
  }
};

exports.deleteProductWithAdminDashboard = async (req, res, next) => {
  const _id = req.body.productId;
  const product = await Product.findOne({ _id });

  const detailDelete = await product.remove();

  if (detailDelete) {
    const doc = await Categories.updateMany(
      { _id: product.categories },
      { $pull: { products: product._id } }
    );
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    } else {
      res.redirect('back'); //pewista wa be agar na refersh nabitawa
    }
  }
};

exports.deleteQuizWithAdminDashboard = async (req, res, next) => {
  const _id = req.body.productId;
  const product = await Quizes.findOne({ _id });

  const detailDelete = await product.remove();

  if (detailDelete) {
    res.redirect('back'); //pewista wa be agar na refersh nabitawa
  }
};
exports.getAllQuizesWithAdminDashboard = catchAsync(async (req, res, next) => {
  const quizes = await Quizes.find({}, { _id: 0, __v: 0 }).sort({ _id: -1 });

  // SEND RESPONSE
  res.status(200).json({
    data: quizes
  });
});
exports.updateProductWithAdminDashboard = async (req, res, next) => {
  const id = req.params.id;

  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const voice = req.body.voice;

  ////////////////////////////////////////////////////////////////////////
  await Product.findById(req.params.id)
    .then(product => {
      product.title = title;
      product.subtitle = subtitle;
      product.voice = voice;

      return product.save().then(result => {});
    })
    .catch(err => {
      throw err;
    });

  let titleNameUpdate = '';
  let subtitleNameUpdate = '';
  let voiceNameUpdate = '';

  await Product.findById(id).then(product => {
    titleNameUpdate = product.title;
    subtitleNameUpdate = product.subtitle;
    voiceNameUpdate = product.voice;
    //categoriesUpdate = product.categories;
  });

  const doc = await Categories.updateOne(
    {
      products: {
        _id: id
      }
    },
    {
      $set: {
        title: titleNameUpdate,
        subtitle: subtitleNameUpdate,
        voice: voiceNameUpdate
      }
    }
  );
  if (doc) {
    res.redirect('back');
  }
};

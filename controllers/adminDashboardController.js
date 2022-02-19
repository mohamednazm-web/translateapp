const Product = require('./../models/productModel');
const Categories = require('./../models/categoriesModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const fileHelper = require('../utils/file');
const fs = require('fs');

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

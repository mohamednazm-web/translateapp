const Products = require('../models/productModel');
const Categories = require('../models/categoriesModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Quizes = require('../models/quizModel');

const ITEMS_PER_PAGE = 8;

exports.home = catchAsync(async (req, res, next) => {
  const i18n = res.setLocale(req.cookies.i18n);

  // SEND RESPONSE
  res.redirect('/admin_dashboard');
});

exports.adminDashboard = catchAsync(async (req, res, next) => {
  const i18n = res.setLocale(req.cookies.i18n);
  console.log(i18n);
  const totalNumOfProducts = await Products.find().countDocuments();

  // SEND RESPONSE
  res.status(200).render('pages/dashboard', {
    totalNumOfProducts,
    i18n: res,
    selectedI18n: i18n
  });
});

exports.productsOfdashboard = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  const products = await Products.find()
    .populate('categories', 'name')
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Products.find()
        .populate('categories', 'name')
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({ _id: -1 });
    });

  const i18n = res.setLocale(req.cookies.i18n);
  // SEND RESPONSE
  res.status(200).render('pages/productsDashboard', {
    products,
    i18n: res,
    selectedI18n: i18n,
    totalNumItems: totalItems,
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
  });
});

exports.quizOfDashboard = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  const products = await Quizes.find()
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Quizes.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({ _id: -1 });
    });

  const i18n = res.setLocale(req.cookies.i18n);
  // SEND RESPONSE
  res.status(200).render('pages/quizeDashboard', {
    products,
    i18n: res,
    selectedI18n: i18n,
    totalNumItems: totalItems,
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
  });
});

exports.addProductWithAdminDashboard = catchAsync(async (req, res, next) => {
  const categories = await Categories.find().populate('products'); //-_id
  const i18n = res.setLocale(req.cookies.i18n);
  // SEND RESPONSE
  res.status(200).render('dashboard/addProduct/index', {
    categories,
    messageSuccessAdd: req.flash('messageSuccessAdd'),
    errorMessage: '',
    i18n: res,
    selectedI18n: i18n
  });
});

exports.addQuestionWithAdminDashboard = catchAsync(async (req, res, next) => {
  const categories = await Categories.find().populate('products'); //-_id
  const i18n = res.setLocale(req.cookies.i18n);
  // SEND RESPONSE
  res.status(200).render('dashboard/addQuestion/index', {
    categories,
    messageSuccessAdd: req.flash('messageSuccessAdd'),
    messageDangerAdd: req.flash('messageDangerAdd'),
    errorMessage: '',
    i18n: res,
    selectedI18n: i18n
  });
});

exports.updateProductWithAdminDashboard = catchAsync(async (req, res, next) => {
  let id = req.params.id;
  const i18n = res.setLocale(req.cookies.i18n);
  const categories = await Categories.find().populate('products'); //-_id

  const getOneProduct = await Products.find({
    _id: {
      $eq: id
    }
  }).populate('categories', 'name');

  //console.log(getOneProduct);

  // SEND RESPONSE
  res.status(200).render('dashboard/editProduct/index', {
    product: getOneProduct,
    categories,
    i18n: res,
    selectedI18n: i18n
  });
});

exports.search = catchAsync(async (req, res, next) => {
  const regex = new RegExp(`${req.query.dsearch}`, 'gi');
  const searchFor = req.query.dsearch;
  const i18n = res.setLocale(req.cookies.i18n);

  const findRes = await Products.find({
    $or: [
      {
        productName: { $regex: regex }
      },
      {
        productNameEnglish: { $regex: regex }
      },
      {
        productNameArabic: { $regex: regex }
      }
    ]
  });
  if (!findRes.length > 0) {
    console.log(findRes);
  }

  res.status(200).render('pages/searchResult', {
    title: 'all',
    allProducts: findRes,
    searchFor: searchFor,
    i18n: res,
    selectedI18n: i18n
  });
});

exports.error500 = catchAsync(async (req, res, next) => {
  const i18n = res.setLocale(req.cookies.i18n);
  res.status(500).render('pages/500', {
    i18n: res,
    selectedI18n: i18n
  });
});

exports.error404 = catchAsync(async (req, res, next) => {
  const i18n = res.setLocale(req.cookies.i18n);
  res.status(404).render('pages/404', {
    i18n: res,
    selectedI18n: i18n
  });
});

console.log('hello');

// to change your remote to other existing remote using this steps
// git remote -v
// git remote set-url origin https://github.com/mohamednazm-web/tulibcinama.git
// git push -f origin master

// git add app.js
// git commit -m "changes"
// git add -A
// git push origin master
// git pull https://github.com/mohamednazm-web/hershcompany.git master

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');
var subcategoriesRouter = require('./routes/subcategories');
var brandsRouter = require('./routes/brands');
var productsRouter = require('./routes/products');
var adminRouter = require('./routes/admin');
var productimagesRouter = require('./routes/productimages');
var bannerRouter = require('./routes/banner');
var couponRouter = require('./routes/coupon');
var cartbannerRouter = require('./routes/cartbanner');
var addressRouter = require('./routes/address');
var purchaseRouter=require('./routes/purchase')
var apiRouter = require('./routes/api');
var productitemRouter=require('./routes/productitem')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories',categoriesRouter);
app.use('/subcategories',subcategoriesRouter);
app.use('/brands',brandsRouter);
app.use('/products',productsRouter);
app.use('/admin',adminRouter);
app.use('/productimages',productimagesRouter)
app.use('/banner',bannerRouter)
app.use('/coupon',couponRouter)
app.use('/cartbanner',cartbannerRouter)
app.use('/api',apiRouter)
app.use('/address',addressRouter)
app.use('/purchase',purchaseRouter)
app.use('/productitem',productitemRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

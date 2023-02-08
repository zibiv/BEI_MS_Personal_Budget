const express = require('express');
const categories = express.Router();
const categoriesController = require('../../controllers/categoriesController');

categories.get('/', categoriesController.getCategories);
categories.param('categoryID', categoriesController.checkCategoryId);
categories.get('/:categoryID', categoriesController.getCategory);
module.exports = categories;
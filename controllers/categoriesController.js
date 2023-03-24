const { db } = require('../model');

const getCategories = async (req, res) => {
  const { rows } = await db('SELECT * FROM envb_user.categories');
  res.status(200).json({ categories: rows });
};

const checkCategoryId = async (req, res, next, categoryId) => {
  const { rows } = await db(
    'SELECT * FROM envb_user.categories WHERE id = $1',
    [categoryId]
  );
  const categoryById = rows[0];
  if (!categoryById) return res.status(404).send('Category not found!');
  req.categoryById = categoryById;
  next();
};

const getCategory = (req, res) => {
  res.status(200).json({ category: req.categoryById });
};

module.exports = {
  getCategories,
  checkCategoryId,
  getCategory,
};

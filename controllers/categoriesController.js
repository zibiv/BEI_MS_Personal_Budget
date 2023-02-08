const categoriesData = {
  categories: require('../model/categories.json'),
  setCategories: function (data) {
    this.categories = data;
  },
};

const getCategories = (req, res) => {
  res.status(200).json({categories: categoriesData.categories});
}

const checkCategoryId = (req, res, next, categoryId) => {
  const categoryById = categoriesData.categories.find((category) => category.id == categoryId);
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
  getCategory
}
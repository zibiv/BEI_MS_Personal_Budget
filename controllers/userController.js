const usersData = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const checkUserId = (req, res, next, userId) => {
  const userById = usersData.users.find((user) => user.id == userId);
  if (!userById) return res.status(404).send('User not found!');
  req.userById = userById;
  next();
};

const getUserData = (req, res) => {
  res.status(200).json({ userData: req.userById });
};

module.exports = {
  checkUserId,
  getUserData,
};

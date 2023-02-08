const express = require('express');
const users = express.Router();
const userController = require('../../controllers/userController');

users.param('userId', userController.checkUserId);
users.get('/:userId', userController.getUserData)

module.exports = users;
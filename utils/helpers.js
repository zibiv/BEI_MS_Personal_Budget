const crypto = require('crypto');

//генерация ID из UUID необходимой длинны
exports.getID = function (length) {
  if (length < 1) return Math.floor(Math.random() * 10);
  return crypto.randomUUID().slice(0,length - 1);
}

//проверка тела запроса на наличие обязательных свойств для создания нового конверта
exports.checkEnvelopeReqBody = function (body, res) {
  const { budget, categoryID, userID, name } =  body;
  if( !budget || !categoryID || !userID || budget < 0 ) return res.status(400).send('Budget, categoryID, userID are required');
  return {budget, categoryID, userID, name};
}

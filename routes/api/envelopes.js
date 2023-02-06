const express = require('express');
const envelopes = express.Router();
const envelopesController = require('../../controllers/envelopesController')

envelopes.route('/')
  //получить все конверты 
  .get(envelopesController.getAllEnvelopes)
  //добавить новый конверт
  .post(envelopesController.postEnvelope);

//проверка параметра на существование такого id
envelopes.param('id', envelopesController.checkId);

envelopes.route('/:id')
  //получение конкретного конверта
  .get(envelopesController.getEnvelope)
  //внесение изменения
  .put(envelopesController.putChangesEnvelope)
  //удаление конверта
  .delete(envelopesController.deleteEnvelope)

module.exports = envelopes;
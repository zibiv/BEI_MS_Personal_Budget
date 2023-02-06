const { getID, checkEnvelopeReqBody } = require('../utils/helpers');

//использование данных из json файла
const envelopesData = {
  envelopes: require('../model/envelopes.json'),
  //передача данных взамен старых
  setEnvelope: function(data) { this.envelopes = data}
}

const getAllEnvelopes = (req, res) => {
  res.json({ envelopes: envelopesData.envelopes });
}

const postEnvelope = (req, res) => {
  const { budget, categoryID, userID, name } =  checkEnvelopeReqBody(req.body, res);
  //🧠наличие категории после создания самих категорий

  //формируем новый конверт
  const newEnvelope = {
    id: getID(8),
    budget,
    categoryID, 
    userID,
    name: !name ? '' : name// name необязательное поле, поэтому может отсутствовать в теле запроса.
  }
  envelopesData.setEnvelope([...envelopesData.envelopes, newEnvelope]);
  res.status(201).json({envelope: newEnvelope});
}

//проверка верности параметра, конверт с таким id должен существовать
const checkId = (req, res, next, id) => {
  const envelopeByID = envelopesData.envelopes.find(envelope => envelope.id === id);
  if(!envelopeByID) return res.sendStatus(404);
  //получив этот конверт мы будем использовать его в дальнейшем пути 
  req.envelopeByID = envelopeByID;
  next();
}

const getEnvelope = (req, res) => {
  res.json({envelope: req.envelopeByID});
}

const putChangesEnvelope = (req, res) => {
  const id = req.body.id; //id который приходит из тела запроса должен совпадать с тем id который содержится в самом конверте
  if(req.envelopeByID.id !== id) return res.status(400).json({error: 'Wrong envelope.'});
  //формируем новый конверт заменяя те данные которые необходимо изменить(присутствуют в теле запроса, кроме разумеется id)
  const updatedEnvelope = {
    id: req.envelopeByID.id,
    //budget два варианта:
    //если в запросе есть свойство для изменения бюджета - то проверяем что бы сумма не была больше имеющейся ? используем разницу между бюджетом и изменением : используем имеющееся значение бюджета
    //если в теле запроса содержится такое свойство то используем его, если нет то используем имеющееся значение бюджета
    //выглядит запутанно, но коротко
    budget: !req.body.changeBudget ? req.body.budget || req.envelopeByID.budget : req.body.changeBudget > req.envelopeByID.budget ? req.envelopeByID.budget : req.envelopeByID.budget - req.body.changeBudget,
    categoryID: req.body.categoryID || req.envelopeByID.categoryID,
    userID: req.body.userID || req.envelopeByID.userID,
    name: req.body.name || req.envelopeByID.name
  }
  //убираем из массива изменяемый конверт по id
  const filteredEnvelopes = envelopesData.envelopes.filter(envelope => envelope.id !== updatedEnvelope.id);
  envelopesData.setEnvelope([...filteredEnvelopes, updatedEnvelope]);
  res.status(200).json({updatedEnvelope});

}

const deleteEnvelope = (req, res) => {
  const filteredEnvelopes = envelopesData.envelopes.filter(envelope => envelope.id !== req.envelopeByID.id);
  envelopesData.setEnvelope([...filteredEnvelopes]);
  res.sendStatus(204);
}

module.exports = {
  getAllEnvelopes,
  postEnvelope,
  checkId,
  getEnvelope, 
  putChangesEnvelope,
  deleteEnvelope
}
const express = require('express');

const Joi = require("joi");

const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact } = require("../../models/contacts");

const {HttpError} = require("../../utils/index")

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch(error) {
    next(error)
  }
  
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await getContactById(contactId);
    if(!result) {
      throw HttpError(404, "Not found. Contact with such id doesn't exist");
    }
    res.json(result);
  } catch(error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
  const {error} = addSchema.validate(req.body);
  if(error) {
    const missingField = error.message.split(' ')[0];
    console.log(missingField);
    throw HttpError(400, `missing required ${missingField} field`);
  };
  const result = await addContact(req.body);
  res.status(201).json(result);
  } catch(error) {
    next(error)
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await removeContact(contactId);
    if(!result) {
      throw HttpError(404, "Not found. Contact with such id doesn't exist");
    };
    res.json({"message": "contact deleted"});
  } catch (error) {
    next(error)
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
      throw HttpError(400, `"missing fields" ${error.message}`);
    };
    const {contactId} = req.params;
    const result = await updateContact(contactId, req.body);
    if(!result) {
      throw HttpError(404, "Not found. Contact with such id doesn't exist");
    };
    res.json(result);
  } catch(error) {
    next(error)
  }
});

module.exports = router;

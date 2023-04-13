const Joi = require("joi");

const contacts = require("../models/contacts/contacts");

const {HttpError} = require("../utils/index")

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
});

const listContacts = async (req, res, next) => {
    try {
      const result = await contacts.listContacts();
      res.json(result);
    } catch(error) {
      next(error)
    }
    
};

const getContactById = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    if(!result) {
      throw HttpError(404, "Not found. Contact with such id doesn't exist");
    }
    res.json(result);
  } catch(error) {
    next(error)
  }
};

const removeContact = async (req, res, next) => {
    try {
      const {contactId} = req.params;
      const result = await contacts.removeContact(contactId);
      if(!result) {
        throw HttpError(404, "Not found. Contact with such id doesn't exist");
      };
      res.json({"message": "contact deleted"});
    } catch (error) {
      next(error)
    }
};

const addContact = async (req, res, next) => {
    try {
    const {error} = addSchema.validate(req.body);
    if(error) {
      const missingField = error.message.split(' ')[0];
      console.log(missingField);
      throw HttpError(400, `missing required ${missingField} field`);
    };
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
    } catch(error) {
      next(error)
    }
};

const updateContact = async (req, res, next) => {
    try {
      const {error} = addSchema.validate(req.body);
      if(error) {
        throw HttpError(400, `"missing fields" ${error.message}`);
      };
      const {contactId} = req.params;
      const result = await contacts.updateContact(contactId, req.body);
      if(!result) {
        throw HttpError(404, "Not found. Contact with such id doesn't exist");
      };
      res.json(result);
    } catch(error) {
      next(error)
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
};
const Joi = require("joi");

const contacts = require("../models/contacts/contacts");

const {HttpError, ControllerWrapper} = require("../utils/index")

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
});

const listContacts = async (req, res) => {
      const result = await contacts.listContacts();
      res.json(result);    
};

const getContactById = async (req, res, next) => {
    const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    if(!result) {
      throw HttpError(404, "Not found. Contact with such id doesn't exist");
    }
    res.json(result);
};

const removeContact = async (req, res) => {
      const {contactId} = req.params;
      const result = await contacts.removeContact(contactId);
      if(!result) {
        throw HttpError(404, "Not found. Contact with such id doesn't exist");
      };
      res.json({"message": "contact deleted"});
};

const addContact = async (req, res) => {
    const {error} = addSchema.validate(req.body);
    if(error) {
      const missingField = error.message.split(' ')[0];
      console.log(missingField);
      throw HttpError(400, `missing required ${missingField} field`);
    };
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const updateContact = async (req, res) => {
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
};

module.exports = {
    listContacts: ControllerWrapper(listContacts),
    getContactById: ControllerWrapper(getContactById),
    removeContact: ControllerWrapper(removeContact),
    addContact: ControllerWrapper(addContact),
    updateContact: ControllerWrapper(updateContact)
};
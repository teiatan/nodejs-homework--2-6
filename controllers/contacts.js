// const contacts = require("../models/contacts/contacts");
const Contact = require("../models/contacts/contact")

const {/* HttpError, */ ControllerWrapper} = require("../utils/index");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);    
};

/* const getContactById = async (req, res,) => {
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
    throw HttpError(404, "Not found. Contact with such id didn't exist");
  };
  res.json({"message": "contact deleted"});
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const {contactId} = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if(!result) {
    throw HttpError(404, "Not found. Contact with such id doesn't exist");
  };
  res.json(result);
}; */

module.exports = {
  listContacts: ControllerWrapper(listContacts),
  /* getContactById: ControllerWrapper(getContactById),
  removeContact: ControllerWrapper(removeContact),
  addContact: ControllerWrapper(addContact),
  updateContact: ControllerWrapper(updateContact) */
};
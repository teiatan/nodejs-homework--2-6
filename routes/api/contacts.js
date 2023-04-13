const express = require('express');

const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact } = require("../../models/contacts");

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch(error) {
    res.status(500).json({
      message: "Server error"
    })
  }
  
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await getContactById(contactId);
    if(!result) {
      return res.status(404).json({
        message: "Contact doesn't exist"
      })
    }
    res.json(result);
  } catch(error) {
    res.status(500).json({
      message: "Server error"
    })
  }
});

router.post('/', async (req, res, next) => {
  try {
  const result = await addContact();
  res.json(result);
  } catch(error) {
    res.status(500).json({
      message: "Server error"
    })
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
  const result = await removeContact();
  res.json(result);
  } catch(error) {
    res.status(500).json({
      message: "Server error"
    })
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const result = await updateContact();
    res.json(result);
  } catch(error) {
    res.status(500).json({
      message: "Server error"
    })
  }
});

module.exports = router;

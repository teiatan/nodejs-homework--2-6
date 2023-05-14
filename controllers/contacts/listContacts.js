const {Contact} = require("../../models/contact")

const {ControllerWrapper} = require("../../utils/index");

const listContacts = async (req, res) => {
  const {_id:owner} = req.user;
  const result = await Contact.find({owner}).populate("owner");
  res.json(result);    
};

module.exports = ControllerWrapper(listContacts);
const {Contact} = require("../../models/contact")

const {ControllerWrapper} = require("../../utils/index");

const listContacts = async (req, res) => {
  const {_id:owner} = req.user;
  const result = await Contact.find({owner}, "-createdAt -updatedAt").populate("owner", "name email subscription");
  res.json(result);    
};

module.exports = ControllerWrapper(listContacts);
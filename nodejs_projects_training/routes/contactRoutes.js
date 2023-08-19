const express = require("express");
const { getContacts, deleteContact, updateContact, createContact, getContact } = require("../controller/contactController");
const validateToken = require("../middlewave/validationToken");
const router = express.Router();


router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").delete(deleteContact).put(updateContact).get(getContact);

module.exports = router;
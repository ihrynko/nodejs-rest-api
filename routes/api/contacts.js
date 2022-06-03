const express = require("express");
const { schema } = require("./schema");
const { validation } = require("../../middlewares/validation");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ status: "success", code: 200, payload: { contacts } });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    return res
      .status(200)
      .json({ status: "success", code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not found" });
});

router.post("/", validation(schema), async (req, res, next) => {
  const contact = await addContact(req.body);
  return res
    .status(201)
    .json({ status: "success", code: 201, payload: { contact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  if (contact) {
    return res
      .status(200)
      .json({ status: "success", code: 200, message: "contact deleted" });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not found" });
});

router.put("/:contactId", validation(schema), async (req, res, next) => {
  const contact = await updateContact(req.params.contactId, req.body);
  if (contact) {
    return res
      .status(200)
      .json({ status: "success", code: 200, message: "contact deleted" });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not found" });
});

module.exports = router;

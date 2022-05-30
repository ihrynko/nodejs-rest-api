const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.send("<h1>pupsik</h1>");
  // res.json({ message: "" });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template gdfg message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template 111 message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;

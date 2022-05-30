const fs = require("fs").promises;
const { v4 } = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  const deletedProduct = contacts[idx];
  if (idx !== -1) {
    contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  }
  if (!deletedProduct) {
    return null;
  }
  return deletedProduct;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name: name, email: email, phone: phone, id: v4() };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

// const addContact = async (body) => {}

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

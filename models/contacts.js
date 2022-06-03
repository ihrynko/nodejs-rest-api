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

async function addContact(body) {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
     await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[index];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

// implement all the functions (working with the json file - backend)
const {loadContacts, saveContacts} = require('../utils/fileUtils')

function addContact(name, email, phone){
 const contacts = loadContacts();
 if (contacts.find(c => c.email === email)) throw new Error("✗ Error: Contact with this email already exists");
  contacts.push({ name, email, phone });
  console.log(`✓ Contact added: ${name}`);
  saveContacts(contacts);
}

function deleteContact(email){
  console.log("Loading contacts from contacts.json...");
  const contacts = loadContacts();
  const index = contacts.findIndex(c => c.email === email);

  if (index === -1) {
    console.log(`✓ Loaded ${contacts.length} contacts`);
    throw new Error(`✗ Error: No contact found with email: ${email}`);
  }

  const removed = contacts.splice(index, 1)[0];
  console.log(`✓ Loaded ${contacts.length + 1} contacts`);
  console.log(`✓ Contact deleted: ${removed.name}`);
  saveContacts(contacts);
}

function listContacts(){
  console.log("Loading contacts from contacts.json...");
  const contacts = loadContacts();
  console.log(`✓ Loaded ${contacts.length} contacts\n\n=== All Contacts ===`);
  contacts.forEach((c, i) => console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`));
}

function searchContactByEmail(email){
  console.log("Loading contacts from contacts.json...");
  const contacts = loadContacts();
  const results = contacts.filter(c =>
  c.email.toLowerCase().includes(email.toLowerCase())
  );
  console.log(`✓ Loaded ${contacts.length} contacts\n`);
  console.log(`=== Search Results for "${email}" ===`);
  if (results.length === 0) {
    console.log(`No contacts found matching "${email}"`);
  } else {
    results.forEach((c, i) => console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`));
  }
}

function searchContactByName(name){
  console.log("Loading contacts from contacts.json...");
  const contacts = loadContacts();
  const results = contacts.filter(c =>
    c.name.toLowerCase().includes(name.toLowerCase())
  );
  console.log(`✓ Loaded ${contacts.length} contacts\n`);
  console.log(`=== Search Results for "${name}" ===`);
  if (results.length === 0) {
    console.log(`No contacts found matching "${name}"`);
  } else {
    results.forEach((c, i) => console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`));
  }
}

function help(){
 console.log(`Usage: node contacts.js [command] [arguments]

Commands:
  add "name" "email" "phone"  - Add a new contact
  list                        - List all contacts
  searchByEmail               - Search contacts by email
  searchByName                - Search contacts by name 
  delete "email"              - Delete contact by email
  help                        - Show this help message

Examples:
  node contacts.js add "John Doe" "john@example.com" "555-123-4567"
  node contacts.js searchByName "john"
  node contacts.js searchByEmail "john@example.com"
  node contacts.js delete "john@example.com"`);
}


module.exports = {addContact, deleteContact, listContacts, searchContactByName, searchContactByEmail, help};

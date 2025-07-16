const fs = require('fs');
const valid = require('../utils/validation');
const service = require('../services/contactService')


function mainFunction(){
  const args = readData();
  handleCommand(args);
}

function readData() {
  const args = process.argv.slice(2);
  return args;
}

function handleCommand(args) {
  try {
    valid.isValidArguments(args);
    const [command, name, email, phone] = args;

    switch (command) {
      case 'add':
        valid.isValidName(name);
        valid.isValidEmail(email);
        valid.isValidPhone(phone);
        service.addContact(name, email, phone);
        break;

      case 'delete':
        service.deleteContact(name);
        break;

      case 'list':
        service.listContacts();
        break;

      case 'search':
        if (name.includes("@")) {
          valid.isValidEmail(name); // email
          service.searchContactByEmail(name);
        } else {
          valid.isValidName(name); // name
          service.searchContactByName(name);
        }
        break;

      case 'help':
        service.help();
        break;

      default:
        throw new Error(`✗ Error: Unknown command '${command}'`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = mainFunction;

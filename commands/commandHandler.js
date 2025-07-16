const fs = require('fs');
const valid = require('../utils/validation');


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
        addContact(name, email, phone);
        break;

      case 'delete':
        deleteContact(name);
        break;

      case 'list':
        listContacts();
        break;

      case 'search':
        if (name.includes("@")) {
          valid.isValidEmail(name); // email
          searchContactByMail(name);
        } else {
          valid.isValidName(name); // name
          searchContactByName(name);
        }
        break;

      case 'help':
        help();
        break;

      default:
        throw new Error(`✗ Error: Unknown command '${command}'`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = mainFunction;

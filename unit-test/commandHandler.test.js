
const mainFunction = require('../commands/commandHandler');
const validation = require('../utils/validation');
const service = require('../services/contactService');

jest.mock('../utils/validation');
jest.mock('../services/contactService');

describe("mainFunction command handling", () => {
  const originalArgv = process.argv;

  afterEach(() => {
    jest.clearAllMocks();
    process.argv = originalArgv;
  });

  test("should handle 'add' command", () => {
    process.argv = ["node", "file", "add", "John", "john@gmail.com", "555-1234"];

    validation.isValidArguments.mockReturnValue(true);
    validation.isValidName.mockReturnValue(true);
    validation.isValidEmail.mockReturnValue(true);
    validation.isValidPhone.mockReturnValue(true);

    mainFunction();

    expect(service.addContact).toHaveBeenCalledWith("John", "john@gmail.com", "555-1234");
  });

  test("should handle 'delete' command", () => {
    process.argv = ["node", "file", "delete", "John"];
    validation.isValidArguments.mockReturnValue(true);

    mainFunction();

    expect(service.deleteContact).toHaveBeenCalledWith("John");
  });

  test("should handle 'list' command", () => {
    process.argv = ["node", "file", "list"];
    validation.isValidArguments.mockReturnValue(true);

    mainFunction();

    expect(service.listContacts).toHaveBeenCalled();
  });

  test("should handle 'search' by email", () => {
    process.argv = ["node", "file", "search", "john@gmail.com"];
    validation.isValidArguments.mockReturnValue(true);
    validation.isValidEmail.mockReturnValue(true);

    mainFunction();

    expect(service.searchContactByEmail).toHaveBeenCalledWith("john@gmail.com");
  });

  test("should handle 'search' by name", () => {
    process.argv = ["node", "file", "search", "John"];
    validation.isValidArguments.mockReturnValue(true);
    validation.isValidName.mockReturnValue(true);

    mainFunction();

    expect(service.searchContactByName).toHaveBeenCalledWith("John");
  });

  test("should handle 'help' command", () => {
    process.argv = ["node", "file", "help"];
    validation.isValidArguments.mockReturnValue(true);

    mainFunction();

    expect(service.help).toHaveBeenCalled();
  });

  test("should log error and show usage if validation fails", () => {
    process.argv = ["node", "file", "add"];
    validation.isValidArguments.mockImplementation(() => {
      throw new Error("✗ Error: Missing arguments");
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    mainFunction();

    expect(consoleErrorSpy).toHaveBeenCalledWith("✗ Error: Missing arguments");
    expect(consoleLogSpy).toHaveBeenCalledWith('Usage: node contacts.js add "name" "email" "phone"');

    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});
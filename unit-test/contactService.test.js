const fs = require("fs");
const path = require("path");

const CONTACTS_PATH = path.join(__dirname, "../contacts.json");
const testData = [
  { name: "John", email: "john@example.com", phone: "0548391023" }
];

beforeEach(() => {
  fs.writeFileSync(CONTACTS_PATH, JSON.stringify(testData));
});

afterAll(() => {
  fs.writeFileSync(CONTACTS_PATH, "[]");
});

const {
  addContact,
  deleteContact,
  listContacts,
  searchContactByEmail,
  searchContactByName
} = require("../services/contactService");

describe("Contact Service", () => {
  test("adds a new contact", () => {
    addContact("Jane", "jane@example.com", "0548720111");
    const contacts = JSON.parse(fs.readFileSync(CONTACTS_PATH));
    const added = contacts.find(c => c.email === "jane@example.com");
    expect(added).toBeDefined();
    expect(added.name).toBe("Jane");
  });

  test("throws error on duplicate email", () => {
    expect(() => {
      addContact("John", "john@example.com", "0504391999");
    }).toThrow("✗ Error: Contact with this email already exists");
  });

  test("deletes an existing contact", () => {
    deleteContact("john@example.com");
    const contacts = JSON.parse(fs.readFileSync(CONTACTS_PATH));
    expect(contacts.find(c => c.email === "john@example.com")).toBeUndefined();
  });

  test("search by email returns correct contact", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    searchContactByEmail("john");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("john@example.com"));
    logSpy.mockRestore();
  });

  test("search by name returns correct contact", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    searchContactByName("john");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("John"));
    logSpy.mockRestore();
  });

  test("listContacts prints all contacts", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    listContacts();
    expect(logSpy).toHaveBeenCalledWith("Loading contacts from contacts.json...");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("✓ Loaded 1 contacts"));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("1. John - john@example.com - 0548391023"));
    logSpy.mockRestore();
  });
});

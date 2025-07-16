const fs = require("fs");
const path = require("path");
const { loadContacts, saveContacts } = require("../utils/fileUtils");

const TEST_PATH = path.join(__dirname, "../test-contacts.json");

describe("File Utils", () => {
  const testContacts = [
    { name: "Alice", email: "alice@example.com", phone: "0501234567" }
  ];

  afterEach(() => {
    if (fs.existsSync(TEST_PATH)) {
      fs.unlinkSync(TEST_PATH);
    }
  });

  test("saveContacts writes data to file", () => {
    saveContacts(testContacts, TEST_PATH);
    const data = JSON.parse(fs.readFileSync(TEST_PATH, "utf-8"));
    expect(data).toEqual(testContacts);
  });

  test("loadContacts reads data from file", () => {
    fs.writeFileSync(TEST_PATH, JSON.stringify(testContacts));
    const loaded = loadContacts(TEST_PATH);
    expect(loaded).toEqual(testContacts);
  });

  test("loadContacts returns empty array if file does not exist", () => {
    if (fs.existsSync(TEST_PATH)) fs.unlinkSync(TEST_PATH);
    const loaded = loadContacts(TEST_PATH);
    expect(loaded).toEqual([]);
  });

  test("loadContacts throws error if file is corrupted", () => {
    fs.writeFileSync(TEST_PATH, "not valid json");
    expect(() => loadContacts(TEST_PATH)).toThrow("✗ Error reading contacts.json: File corrupted");
  });
});

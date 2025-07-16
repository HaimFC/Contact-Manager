const validation = require('../utils/validation')

test("Should check if isValidEmail - correct email", () =>{
    let email = "tryemail@gmail.com";
    let checkEmail = validation.isValidEmail(email);
    expect(checkEmail).toEqual(true);
})

test("Should throw error for invalid email", () => {
  const email = "tryemailgmail.com"; 

  expect(() => {
    validation.isValidEmail(email);
  }).toThrow("✗ Error: Email must contain @ symbol");
});

test("Should pass for valid phone format 555-123-4567", () => {
  expect(validation.isValidPhone("555-123-4567")).toBe(true);
});

test("Should throw error for phone with invalid format (missing digits)", () => {
  const phone = "123-45";
  expect(() => {
    validation.isValidPhone(phone);
  }).toThrow("✗ Error: Phone format is invalid. Use 555-123-4567 or 555-1234");
});

test("Should throw error for phone with letters", () => {
  const phone = "abc-def-ghij";
  expect(() => {
    validation.isValidPhone(phone);
  }).toThrow("✗ Error: Phone format is invalid. Use 555-123-4567 or 555-1234");
});

test("Should pass for valid name 'John'", () => {
  expect(validation.isValidName("John")).toBe(true);
});

test("Should throw error for name with only one character", () => {
  const name = "A";
  expect(() => {
    validation.isValidName(name);
  }).toThrow("✗ Error: Name must be at least 2 characters");
});

test("Should throw error for name with spaces only", () => {
  const name = "   ";
  expect(() => {
    validation.isValidName(name);
  }).toThrow("✗ Error: Name must be at least 2 characters");
});

test("Should pass for valid 'add' command with 3 arguments", () => {
  const args = ["add", "John", "john@example.com", "555-1234"];
  expect(validation.isValidArguments(args)).toBe(true);
});

describe("isValidArguments", () => {
  test("Should throw error when no command is provided", () => {
    const args = [];
    expect(() => {
      validation.isValidArguments(args);
    }).toThrow("✗ Error: No command provided");
  });

  test("Should throw error for unknown command", () => {
    const args = ["unknown", "arg1"];
    expect(() => {
      validation.isValidArguments(args);
    }).toThrow("✗ Error: Unknown command 'unknown'");
  });

  test("Should throw error when 'add' command has too few arguments", () => {
    const args = ["add", "name"];
    expect(() => {
      validation.isValidArguments(args);
    }).toThrow("✗ Error: Missing arguments for 'add' command");
  });

  test("Should throw error when 'delete' command has no argument", () => {
    const args = ["delete"];
    expect(() => {
      validation.isValidArguments(args);
    }).toThrow("✗ Error: Missing arguments for 'delete' command");
  });

  test("Should throw error when 'search' command has no argument", () => {
    const args = ["search"];
    expect(() => {
      validation.isValidArguments(args);
    }).toThrow("✗ Error: Missing arguments for 'search' command");
  });
});
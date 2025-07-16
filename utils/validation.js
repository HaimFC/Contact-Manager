// Handle validation for user input - frontend

function isValidArguments(args) {
    const command = args[0];

    if (!command) {
        throw new Error("✗ Error: No command provided");
    }

    const commands = {
        add: 3,
        delete: 1,
        search: 1,
        list: 0,
        help: 0
    };

    if (!(command in commands)) {
        throw new Error(`✗ Error: Unknown command '${command}'`);
    }

    const expectedArgs = commands[command];
    const actualArgs = args.length - 1;

    if (actualArgs < expectedArgs) {
        throw new Error(`✗ Error: Missing arguments for '${command}' command`);
    }

    return true;
}

function isValidEmail(email) {
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("✗ Error: Email must contain @ symbol");
    }
    return true;
}

function isValidPhone(phone) {
    if (typeof phone !== "string" || !/^(\d{3}-\d{3}-\d{4}|\d{3}-\d{4})$/.test(phone)) {
        throw new Error("✗ Error: Phone format is invalid. Use 555-123-4567 or 555-1234");
    }
    return true;
}

function isValidName(name) {
    if (typeof name !== "string" || name.trim().length < 2) {
        throw new Error("✗ Error: Name must be at least 2 characters");
    }
    return true;
}

module.exports = {isValidArguments,isValidEmail,isValidPhone, isValidName};

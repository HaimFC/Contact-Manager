const fs = require("fs");

function loadContacts(fileName = "contacts.json"){
    try{
const data = fs.readFileSync(fileName, "utf-8")
return JSON.parse(data)
} catch (e) {
    if (e.code === "ENOENT") {
      console.log("✗ File not found - creating new contact list");
       return [];
     } else {
       throw new Error("✗ Error reading contacts.json: File corrupted");
}}}

function saveContacts(contacts, fileName = "contacts.json"){
    try {
        fs.writeFileSync(fileName, JSON.stringify(contacts, null, 2))
        console.log("✓ Contacts saved to contacts.json")
    } catch (e){
        throw new Error("✗ Error saving contacts")
    }
    
}

module.exports = {loadContacts, saveContacts};

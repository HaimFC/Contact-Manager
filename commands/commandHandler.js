//frontend

const fs = require('fs');


function readData() {
  const args = process.argv.slice(2);
  console.log("Arguments from CLI:", args);
}



module.exports = readData;
const request = require('request');
const fs = require('fs');
const readline = require('readline');

// create object that reads and writes to command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// takes the arguments from CLI
const url = process.argv[2];
const filePath = process.argv[3];

// a function that makes request and writes the pulled date to a file
const requestWrite = function(){
  request(url, (error, response, body) => {
    fs.writeFile(filePath, body, err => {
      if (err) {
        console.error(err);
      }
    });
    console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
  });
}


if (fs.existsSync(filePath)) { //if life alredy exist
  rl.question('File path already exists. To overwrite type "Y" and press enter: ', (answer) => {
    if (answer.toUpperCase() === 'Y') { //if user wnat to ovrewrite
      requestWrite()
    }
    rl.close()
    return
  });
} else { // if file doe'nr exist
  requestWrite()
  rl.close()
  return
}







     
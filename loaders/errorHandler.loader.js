// modules
const fs = require('fs');

module.exports = {
  create() {
    // create logs folder
    if (!fs.existsSync('./logs')) {
      console.log('[+] logs folder created');
      fs.mkdirSync('./logs');
    }

    

   

    // error log management
    const errorLogStream = fs.createWriteStream(`${ __dirname }/../logs/error.log`, {
      flags: 'a'
    });
 
    // error handling, avoiding crash
    process.on('uncaughtException', (err, req, res, next) => {
      const date = new Date();
      console.error(`+++++++ ${ date } error found, logging event +++++++ `);
      console.error(err.stack);
      errorLogStream.write(`${ date } \n ${ err.stack } \n\n`);

      return;
    });
  },
  
};
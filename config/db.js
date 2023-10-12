const mysql = require('mysql')

const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
port: "3306",
database:"rmsdb" 
});

db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + db.threadId);
  });

module.exports = db;
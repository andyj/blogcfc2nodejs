var _mysql = require('mysql');

var MYSQL_USER = 'root';
var MYSQL_PASS = '';
var DATABASE = 'blogcfc';
var tblblogentries = 'tblblogentries';

// MySQL connect
var mysql = _mysql.createClient({
    user: MYSQL_USER,
    password: MYSQL_PASS,
});

// MySQL USE database
mysql.query('use ' + DATABASE);

exports.home = function(req, res){
    mysql.query("SELECT title, SUBSTRING_INDEX(body, '. ', 1) AS body, alias FROM tblblogentries ORDER BY posted DESC LIMIT 10",
        function(err, result, fields) {
            if (err) {
                console.log("******* OH NO!");
                throw err;
            }
            else {
                console.log('SQL: SELECT * FROM `tblblogentries` ');
                res.render('blog/home', { title: 'Andy Jarretts Blog', result: result});
            }
        });
};


exports.post = function(req, res){
    mysql.query('SELECT * FROM `tblblogentries` ORDER BY posted DESC LIMIT 10',
        function(err, result, fields) {
            if (err) throw err;
            else {
                console.log('SQL: SELECT * FROM `tblblogentries` ');
                res.render('blog/home', { title: 'Andy Jarretts Blog', result: result});
            }
        });
};
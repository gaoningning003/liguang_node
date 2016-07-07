/**
 * New node file
 */

var databaseUrl = "mongodb://liguanggongzi:asd1215225@ds021000.mlab.com:21000/liguangweb"; // "username:password@example.com/mydb"
var collections = ["users", "reports"]
var mongojs = require('mongojs')
var db = mongojs(databaseUrl, collections);
module.exports = db
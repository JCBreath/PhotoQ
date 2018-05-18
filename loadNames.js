var obj  = require('./6whs.json');
var url = require('url');
var http = require('http');
var sizeOf = require('image-size');
var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");
var entries = 0;
var dbFileName = "PhotoQ.db";
var db = new sqlite3.Database(dbFileName);
var location = '';
var list = '';
http.globalAgent.maxSockets = 1;
var len = obj.photoURLs.length;
var i = 0;
var height = 0;
var width = 0;
var index;



for(i; i < len; i ++){
var firstPhoto = obj.photoURLs[i];
var options = url.parse(firstPhoto);


http.get(options, function (response) {
  var chunks = [];
  response.on('data', function (chunk) {
    chunks.push(chunk);
  }).on('end', function() {
    var buffer = Buffer.concat(chunks);
	saveTable(i, dbFileName, sizeOf(buffer).height, sizeOf(buffer).width, location, list);

});
});


}

dumpDB();



var cmdStr = 'INSERT INTO photoTags VALUES(_IDX, "_FILENAME", _WIDTH, _HEIGHT, "_LOC", "_LIST")';
var cbCount = 0;


function insertDataCallback(err) {
        if(err){
                console.log("Error while saving data in DB: ", err);
        }

        cbCount += 1;
        if(cbCount == len) db.close();


}

function saveTable(index, name, height, width, location, list){
        var cmd = cmdStr.replace("_IDX", index);
        cmd = cmd.replace("_FILENAME", name);
        cmd = cmd.replace("_WIDTH", width);
        cmd = cmd.replace("_HEIGHT", height);
        cmd = cmd.replace("_LOC", location);
        cmd = cmd.replace("_LIST", list);
        console.log("        item", index, "complete!");
        db.run(cmd, insertDataCallback);

}

function dumpDB() {
  db.all ( 'SELECT * FROM photoTags', dataCallback);
      function dataCallback( err, data ) {
		console.log(data) 
      }
}

var obj  = require('./6whs.json');
var url = require('url');
var http = require('http');
var sizeOf = require('image-size');
var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");

var dbFileName = "PhotoQ.db";
var db = new sqlite3.Database(dbFileName);

http.globalAgent.maxSockets = 1;
var len = obj.photoURLs.length; // number of images in photoURLS
var i = 0;


for(i; i < len; i ++){ // for number of images in array 

var firstPhoto = obj.photoURLs[i];
var options = url.parse(firstPhoto);

// get image dimensions
http.get(options, function (response) {
  var chunks = [];
  response.on('data', function (chunk) {
    chunks.push(chunk);
  }).on('end', function() {
    var buffer = Buffer.concat(chunks);
    console.log(sizeOf(buffer).height); // height usage: sizeOf(buffer).width/height
// need to insert each image into the DB

});
});


}


var cmdStr = 'INSERT INTO photoTags VALUES(_IDX, "_FILENAME", _WIDTH, _HEIGHT, "_LOC", "_LIST")';
var cbCount = 0;


function insertDataCallback(err) {

        if(err){
                console.log("Error while saving data in DB: ", err);
        }

        cbCount += 1;
        if(cbCount == len) db.close();


}
// add to table
function saveTable(index, name, dims, location, list){

        var cmd = cmdStr.replace("_IDX", index);
        cmd = cmd.replace("_FILENAME", name);
        cmd = cmd.replace("_WIDTH", dims.width);
        cmd = cmd.replace("_HEIGHT", dims.height);
        cmd = cmd.replace("_LOC", location);
        cmd = cmd.replace("_LIST", list);

        console.log("        item", index, "complete!");
        db.run(cmd, insertDataCallback);

}

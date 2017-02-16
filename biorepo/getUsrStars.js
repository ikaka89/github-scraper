/**
This script takes a user and a page number and ouputs his stars:
user	star
*/

// define a file streamer
var user = process.argv[2];
var page = process.argv[3];
var stars = require('../lib/switcher');


var url = user.concat("?page=").concat(page).concat("&tab=stars");
stars(url,function(err,data){
	for(i=0; i<data.stars.length;i++){
		console.log(url.replace(/\?page..+/,"").replace("https://github.com/","")+"\t"+data.stars[i]);
	}
})

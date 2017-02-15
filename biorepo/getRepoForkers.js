/**
This script takes in a list of repos and outputs all its forkers as:-
forker	repo
*/

// define a file streamer
var fs = require('fs');
var reposList = JSON.parse(fs.readFileSync('test.json','utf8'));
var forkers = require('../lib/switcher');

var outRepo = [];
var outUser = [];
for(r=0; r<reposList.repos.length; r++){ // over all repos
	// get url
	var url = reposList.repos[r].concal("/network/memebers");
	forkers(url,function(err,data){
		for(i=0; i<data.forkers.length; i++){
			outRepo.push(reposList.repos[r]);
			outUser.push(data.forkers[i]);
		}
	})
}

for(i=0; i <outRepo.length; i++){
	console.log(outUser[i]+"\t"+outUser[i]);
}

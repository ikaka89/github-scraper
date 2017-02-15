/**
This script takes in a list of repos and outputs all its watchers as:-
watchers	repo

Only looks at the first 5 pages due to rate limiting issues
*/

// define a file streamer
var fs = require('fs');
var reposList = JSON.parse(fs.readFileSync('test.json','utf8'));
var watchers = require('../lib/switcher');

var outRepo = [];
var outUser = [];
for(r=0; r<reposList.repos.length; r++){ // over all repos
	// get url
	var url = reposList.repos[r].concal("/watchers");
	var count = 0;
	watchers(url,function(err,data){
		if(typeof data.next_page !== 'undefined' && count<5){
			for(i=0; i<data.watchers.length; i++){
				outUser.push(data.watchers[i]);
				outRepo.push(reposList.repos[r]);
			}
			count++;
			watchers(data.next_page,callback);
		}else{
			for(i=0; i<data.stargazers.length; i++){
				outUser.push(data.stargazers[i]);
				outRepo.push(reposList.repos[r]);
			}
		}	
	});
}

for(i=0; i <outRepo.length; i++){
	console.log(outUser[i]+"\t"+outUser[i]);
}
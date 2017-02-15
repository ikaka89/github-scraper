/**
This script takes in a list of users and ouputs all the repos created by the user (both forked and own)
user	repo	tag(own/forked/)

Only looks at the first 5 pages due to rate limiting issues
*/

// define a file streamer
var fs = require('fs');
var userList = JSON.parse(fs.readFileSync('test.json','utf8'));
var prepos = require('../lib/switcher');

var outUser = [];
var outRepo = [];
var outRepoTag = [];

for(u=0; u<userList.usrs.length; u++){ // over all repos
	// get url
	var url = userList.usrs[u].concal("?tab=repositories");
	var count = 0;
	prepos(url,function callback(err,data){
		if(typeof data.next_page !== 'undefined' && count<5){
			for(i=0; i<data.ownrepos.length; i++){
				outUser.push(userList.usrs[u]);
				outRepo.push(data.ownrepos[i]);
				outRepoTag.push("Own");
			}
			for(i=0; i<data.forkedrepos.length; i++){
				outUser.push(userList.usrs[u]);
				outRepo.push(data.forkedrepos[i]);
				outRepoTag.push("Forked");
			}
			count++;
			prepos(data.next_page,callback);
		}else{
			for(i=0; i<data.ownrepos.length; i++){
				outUser.push(userList.usrs[u]);
				outRepo.push(data.ownrepos[i]);
				outRepoTag.push("Own");
			}
			for(i=0; i<data.forkedrepos.length; i++){
				outUser.push(userList.usrs[u]);
				outRepo.push(data.forkedrepos[i]);
				outRepoTag.push("Forked");
			}
		}	
	});
}

for(i=0; i <outOwnRepo.length; i++){
	console.log(outUser[i]+"\t"+outOwnRepo[i]+"\t"+outRepoTag[i]);
}

/**
This script takes in a list of users and ouputs all the repos the user has starred:
user	star

Only looks at the first 5 pages due to rate limiting issues
*/

// define a file streamer
var fs = require('fs');
var userList = JSON.parse(fs.readFileSync('test.json','utf8'));
var stars = require('../lib/switcher');




function execute(cb){
	var out = { outUser: ['akshay'], outRepo: []};
	for(u=0; u<userList.usrs.length; u++){ // over all repos
		// get url
		var url = userList.usrs[u].concat("?tab=stars");
		var count = 0;
		stars(url,function callback(err,data){
			if(typeof data.next_page !== 'undefined' && count<5){
				for(i=0; i<data.stars.length; i++){
					out.outUser.push(data.url.replace(/\?tab.*/,"").replace("https://github.com/",""));
					out.outRepo.push(data.stars[i]);
				}
				count++;
				stars(data.next_page,callback);
			}else{
				for(i=0; i<data.stars.length; i++){
					out.outUser.push(data.url.replace(/\?tab.*/,"").replace("https://github.com/",""));
					out.outRepo.push(data.stars[i]);
				}
			}
		});
	}
	
}

execute(function(err,out){
	console.log(out.outRepo.length);
	for(i=0;i<out.outRepo.length; i++){
		console.log(out.outRepo[i]);
	}
})
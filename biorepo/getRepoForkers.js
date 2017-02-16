/**
This script takes in a list of repos and outputs all its forkers as:-
forker	repo
*/

var repo = process.argv[2];
var forkers = require('../lib/switcher');



var url = repo.concat("/network/members");
forkers(url,function(err,data){
	for(f=0; f<data.forkers.length; f++){
		console.log(data.forkers[f]+"\t"+url.replace("/network/members",""));
	}
})
var gitrepo = "orgs/seqcode/people"

// get all users from seqcode

var people = require('../lib/switcher');

people(gitrepo,function (err, data){
	for (i in data.entries) {
	    console.log(data.entries[i]);
	}
})

gitrepo = "/seqcod/"



people(gitrepo,function(err,data){
	console.log(data);
})
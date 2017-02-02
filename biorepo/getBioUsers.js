var url = "seqcode/encodedream";

// define the switcher
var repo = require('../lib/switcher');

repo(url, function(err, stats) {
	console.log(stats);
})






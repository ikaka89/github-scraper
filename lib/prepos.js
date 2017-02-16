/**
 * prepo method scrapes a given GitHub user's repositories tab
 * and returns a list of own and forked repos
 */
module.exports = function prepos ($, url, callback) {
  var data = { repos: [], url:url, flags:[]}; // store repos in array
  //console.log($.html());
  
  $('#user-repositories-list').find('a[itemprop="name codeRepository"]').each(function(){
	  if($(this).parent().siblings().length === 0){
		 // console.log($(this).attr('href'));
		data.repos.push($(this).attr('href'));
		data.flags.push("Own");
	  }else{
		  data.repos.push($(this).parent().siblings().find('a').attr('href'));
		  data.flags.push("Forked");
	  }
  })
  
  if(typeof $('.pagination') !== 'undefined'){
	  if($('.pagination').children().last().text() === 'Next'){
		  data.next_page = $('.pagination').children().last().attr('href');
		  //console.log($('.pagination').children().last().attr('href'));
	  }
  }
  
  callback(null,data);
 
}
 

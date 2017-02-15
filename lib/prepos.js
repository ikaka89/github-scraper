/**
 * prepo method scrapes a given GitHub user's repositories tab
 * and returns a list of own and forked repos
 */
module.exports = function prepos ($, url, callback) {
  var data = { ownrepos: [], url:url, forkedrepos: []}; // store repos in array
  //console.log($.html());
  
  $('#user-repositories-list').find('a[itemprop="name codeRepository"]').each(function(){
	  if($(this).parent().siblings().length === 0){
		data.ownrepos.push($(this).attr('href'));
	  }else{
		  data.forkedrepos.push($(this).parent().siblings().find('a').attr('href'));
	  }
  })
  
  if(typeof $('.pagination') !== 'undefined'){
	  if($('.pagination').children().last().text() === 'Next'){
		  data.next_page = $('.pagination').children().last().attr('href');
		  console.log($('.pagination').children().last().attr('href'));
	  }
  }
 
}
 

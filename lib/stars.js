/**
 * prepo method scrapes a given GitHub user's stars tab
 * and returns a list of starred repos
 */
module.exports = function stars ($, url, callback) {
  var data = { stars: [], url:url}; // store repos in array
  //console.log($.html());
  
  $('h3').each(function(){
	  data.stars.push($(this).find('a').attr('href'));
	  //console.log($(this).find('a').attr('href'));
  })
  
  if(typeof $('.pagination') !== 'undefined'){
	  if($('.pagination').children().last().text() === 'Next'){
		  data.next_page = $('.pagination').children().last().attr('href');
		  //console.log($('.pagination').children().last().attr('href'));
	  }
  }
  
  return callback(null, data);
 
}

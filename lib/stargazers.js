/**
 * stargazers method scrapes a given GitHub repos stargazers page (/user/repo/stargazers)
 * @param {Object} $ - cheerio object with DOM of page to be scraped
 * @param {string} project - a valid GitHub repository's stargazers page
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {object} error - an error object (set to null if no error occurred)
 *  @param {array} data - list of users who have starred this repo
 */

function stargazers ($, url, callback) {
  var data = { "url" : url};
  data.stargazers = [];
  //data.url = url;
  //console.log($.html());
  $('.follow-list-item').each(function(){
	data.stargazers.push($(this).find('img').attr('alt').replace('@',''));
  })  
  if(typeof $('.pagination') !== 'undefined'){
	  if($('.pagination').find('a').last().text() === "Next"){
	  	data.next_page = $('.pagination').find('a').last().attr('href');
  	   }
  }
  
  return callback(null, data);
  
}

module.exports = stargazers;
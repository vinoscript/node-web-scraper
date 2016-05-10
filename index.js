var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var path = 'http://substack.net/images/';
// var htmlData = '';
var urls = [];
// var url;

request(path, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log("succesfully connected to data"); 
    var $ = cheerio.load(body);
    $('a').each(function(){
      // var url = this.attr('href');
      urls.push($(this).attr('href'));
    });
    console.log(urls);

  }
  else {
    console.log("failed to get data");
  }
})


// var cheerio = require('cheerio'),
//     $ = cheerio.load(htmlData);



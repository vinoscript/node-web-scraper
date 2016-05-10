var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var pathMain = 'http://substack.net/images/';
var pathPrefix = 'http://substack.net';
var urls = [];

function getUrlPath(path){ 
  request(path, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      console.log("succesfully connected to data"); 
      var $ = cheerio.load(body);

      $('a').each(function(){
        var url = $(this).attr('href');

        var filePattern     =   new RegExp(/.*(\.[a-z]{3})$/);
        var dotDotPattern   =   new RegExp(/.*\.\..*/);
        var urlPattern      =   new RegExp(/^http.*/);
        var endsWithSlash   =   new RegExp(/\/$/);

        if( filePattern.test(url) ){
          urls.push(url);
          // console.log(url);

          fs.writeFile("images.csv", urls, function(err) {
              if(err) {
                return console.log(err);
              }
              console.log("The file was saved!");
          }); 

        } 

        else if ( endsWithSlash.test(url) && !(urlPattern.test(url)) && !(dotDotPattern.test(url)) ) {
          getUrlPath(pathPrefix + url);
        }
      
      });

    }

    else {
      console.log("failed to get data");
    }

  })
}



getUrlPath(pathMain);



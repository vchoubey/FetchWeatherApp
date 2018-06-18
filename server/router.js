const path = require('path');
const url = require('url');
const utils = require('./http-helpers');
const fs = require('fs');
const ejs = require('ejs');
const fetchWeather = require('./../controller/fetchWeather');
let data = undefined;
let statusCode = 0;
let cityName = undefined;
let weather = undefined;

const actions = {
  'GET': async function(req, res) {
    /* if your router needs to pattern-match endpoints*/
     const parsedUrl = url.parse(req.url);

     if(parsedUrl.pathname === '/'){ 
        data = fs.readFileSync('C:\\Users\\vanic\\Documents\\Js-Project\\FetchWeather\\public\\index.html');
        statusCode = 200
        utils.respond(res, data, statusCode);
     }
     else{
        cityName = parsedUrl.path.substring(parsedUrl.path.indexOf('=')+1, parsedUrl.path.length);
        cityName = cityName.replace('+', ' ');
        weather = await fetchWeather.weatherInfo(cityName);      
        if (weather == 'The city is not in our catalog. Sorry!'){
          data = ejs.render(weather);
          statusCode = 200;
          utils.respond(res, data, statusCode);
        }
        else{
          realFeel = weather.RealFeel;
          temperature = weather.Temperature;
          summary = weather.Summary;
          data = ejs.renderFile('C:\\Users\\vanic\\Documents\\Js-Project\\FetchWeather\\public\\weather.html', {weather: realFeel, temperature, summary, cityName}, function(error, data){
            if(error){
              utils.send404(res);
            }
            else{
              statusCode = 200;
              utils.respond(res, data, statusCode);
            }
          })
        }
     }
  }
}; 

exports.handleRequest = function(req, res) {
  var action = actions[req.method];
  action ? action(req, res) : utils.send404(res);
  action(req, res)
};
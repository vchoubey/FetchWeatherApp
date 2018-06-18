/*let weatherPerCity = {
    'Toronto' : 15,
    'Vancouver' : 17,
    'Edmonton' : 9
}*/

//let inputCity = 'Vancouver';

const fetch = require('node-fetch');
/*let city = 'Vancouver';*/

let weather = 0;

const apiKey = 'qCMwpwdmR6AVotYtdeR65i6uKMyUD6dY';
//const url_getLocation = 'http://dataservice.accuweather.com/locations/v1/cities/search';
//const url_getCurrentWeather = 'http://dataservice.accuweather.com/currentconditions/v1/';
var accuweather = require('node-accuweather')()(apiKey);

//let urlLocationKey = url_getLocation + '?apikey=' + apiKey + '&q=' + city

async function retrieveWeather (inputCity){
    await accuweather.getCurrentConditions(inputCity, {unit: "Celsius"})
    .then(function(result) {
      weather = result;
    }).then(result => result);
    /*await fetch('https://swapi.co/api/planets/1/').then(response => {
      return response.json();
    }).then(data => {
      weather = 74
      console.log(data.name);
    }).catch(err => {
      weather  = 0;
      console.log("error");
  });*/
}

exports.weatherInfo = async function(cityName){
  if(cityName !== undefined){
    await retrieveWeather(cityName);
    return weather;
    
  }
  else{
    result = "The city is not in our catalog. Sorry!"
    return String(result);        
  }
}


const axios = require('axios');
const { locationSchema } = require('../model/location')
require('dotenv').config()

// get distance from given coordinates
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

//converts degree to radians
function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// fetch location using an external api for geodata
const RAPIDAPIKEY = process.env.RAPIDAPIKEY
const options = {
    method: 'GET',
    url: 'https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation',
    params: {apikey: '873dbe322aea47f89dcf729dcc8f60e8'},
    headers: {
      'X-RapidAPI-Key': RAPIDAPIKEY,
      'X-RapidAPI-Host': 'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com'
    }
  };
  
  async function getCurrentLocation(req,res, next){
    const response = await axios.request(options)
    const { id } = req.params
    locationSchema.findOne({id}, 'coordinates locationName' , function(err,location){
        if (err) console.log(err);
        else if(!location){
            res.status(404).json({
              success:true,
              msg:'Distance cannot be calculated because location does not exist'
            })
        }
        else{
           const {longitude:currentLongitude ,latitude:currentLatitude , city , country } = response.data
           const { longitude , latitude } = location.coordinates
           const distance = getDistanceFromLatLonInKm( currentLatitude , currentLongitude , latitude , longitude )
          //  passed the distance to the next function using the req
           req.distance = distance
           city?req.city1 = city:req.city1=''
           req.city2 = location.locationName
           next()
        }
    
  })
}
  
  module.exports = { getCurrentLocation }
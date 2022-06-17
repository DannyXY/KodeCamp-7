const axios = require("axios");
const {locationSchema} = require('../model/location')

function addLocation(req,res){
  const {
    locationName,
    description,
    website, 
    phone, 
    contactPerson,
    coordinates
  } = req.body

  const newLocation = new locationSchema({
    locationName,
    description,
    website, 
    phone, 
    contactPerson,
    coordinates
  })

  newLocation.save(function(err){
    if (err) console.log(err);
    res.status(201).json({
      success:true,
      msg:'location saved'
    })
  })
}

async function editLocation( req , res ) {
  const {id : locationID} = req.params
  const location = await locationSchema.findOneAndUpdate({_id:locationID}, req.body , {
    new: true,
    runValidators:true}
    )
    if(!location){
      res.status(404).json({
        success:false,
        msg:`No location matches the given ID${locationID}`
      })
    }
    res.status(201).json({
      success:true,
      msg:'update completed'
    })
}
async function deleteLocation(req,res) {
  const {id : locationID} = req.params
  const location = await locationSchema.findOneAndDelete({_id:locationID})
  if(!location){
    res.status(404).json({
      success:false,
      msg:'the location doesnt ecist this cannot be deleted'
    })
  }
  else{
    res.status(200).json({
      success:true,
      msg:'location deleted sucessfully'
    })
  }}

async function fetchAllLocations(req,res) {
  const locations = await locationSchema.find({})
  res.status(200).json({
    success:'true',
    data:locations
  })
}

async function getSingleLocation(req,res){
  const {id} = req.params
  locationSchema.findOne({id}, 'coordinates locationName contactPerson phone' , function(err,location){
    if (err) console.log(err);
    else{
    // res.send(`The coordinates for the location ${location.locationName} is ${location.coordinates}
    // For more info, contact ${location.contactPerson} at ${location.phone}`)
    res.status(200).json({
      success:true,
      data:location
    })
  }})
}

async function getDistance(req,res) {
  const distance = req.distance
  const city1 = req.city1
  const city2 = req.city2
  res.status(200).json({
    success:true,
    data:{
      currentCity:city1,
      secondCity:city2,
      distance
    }
  })
  
  // res.send(`the distance between your location ${city1} in ${country} and ${city2} is ${distance}km `)
}

module.exports = { deleteLocation, editLocation, fetchAllLocations, addLocation , getDistance , getSingleLocation }
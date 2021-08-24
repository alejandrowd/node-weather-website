const request = require('request')

// const geocode = (address, callback) =>{
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmlkZWxpb2VjIiwiYSI6ImNrc2t3NXZ0dDAwaWczMm1yaG44bW4xdWUifQ.OCB3f3YdbW291BiBZJcOIw&limit=1'

//     request ({url, json:true}, (error, response)=>{
//         if(error){
//             callback('unable to connect to location services!', undefined)
//         }else if(response.statusCode !== 200 || response.body.features.length === 0){
//             callback('unable to find location', undefined)
//         }else{
//             callback(undefined, {
//                 latitude : response.body.features[0].center[1],
//                 longitude : response.body.features[0].center[0],
//                 location : response.body.features[0].place_name
//             })
//         }
//     })
// }


//---------------DESTRUCTURING OBEJCT---------------------

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmlkZWxpb2VjIiwiYSI6ImNrc2t3NXZ0dDAwaWczMm1yaG44bW4xdWUifQ.OCB3f3YdbW291BiBZJcOIw&limit=1'

    request ({url, json:true}, (error, {body})=>{
        if(error){
            callback('unable to connect to location services!', undefined)
        }else if(body.features.length === 0){
            callback('unable to find location', undefined)
        }else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}


module.exports = geocode
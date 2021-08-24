const request = require('request')

// const forecast = (latitude, longitude, callback)=>{
//     const url = 'http://api.weatherstack.com/current?access_key=f89b62ca40bed52d875e39e3bc7b5da1&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
//     request({url,json:true},(error,response)=>{
//         if(error){
//             callback('unable to connect to weather service!',undefined)
//         }else if(response.body.error){
//             callback('unable to find location',undefined)
//         }else{
//             callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees. It feels like ' + response.body.current.feelslike + ' degrees out.')
//         }
//     })

// }


//---------------DESTRUCTURING OBEJCT---------------------

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=f89b62ca40bed52d875e39e3bc7b5da1&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })

}

module.exports = forecast
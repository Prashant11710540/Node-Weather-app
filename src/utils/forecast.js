const request  = require('postman-request')


const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=94a65fc123e0182ee86212b7626a6dfc&query=' +
    latitude + ','+ longitude + '&units=m'
// response object destructured
    request({url,json:true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to forecast services',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] +
                            '. It is currently '+ body.current.temperature +
                         ' degrees and feels like '+ body.current.feelslike + ' degrees out. Visibility is around '
                         + body.current.visibility + " km.")
        }
    })

}

module.exports = forecast

//const url = 'http://api.weatherstack.com/current?access_key=94a65fc123e0182ee86212b7626a6dfc&query=37.8267,-122.4233&units=f'

// request({ url:url, json: true }, (error, response) => {

//     //json = true parse response to json object
//     //console.log(response.body.current)

//     if(error)
//     {
//         //console.log(error)
//         console.log(chalk.inverse.red('Unable to connect to weather service'))
//     }else if(response.body.error){
//         console.log(chalk.inverse.red('Unable to find location'))
//     }
//     else{
//         console.log( response.body.current.weather_descriptions[0] +
//             '. It is currently '+ response.body.current.temperature +
//          ' degrees and feels like '+ response.body.current.feelslike + ' degrees out')
//     }
    
//     // const data = JSON.parse(response.body)
//     // console.log(data.current)
// })

const request = require('request')

const forecast = (place, latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c97446f4ea62e39e53ee0238b6f5f8d7&query='+ place
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            
            callback(undefined,body)
            // callback(undefined, place + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
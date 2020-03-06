const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/339da1861a28ac361ffa1ce990959d7f/'+latitude+','+longitude+'?units=si&lang=en'
    //shorthand object notation used and also destructured object
    request({url, json: true},(error,{body})=>{
    if(error)
    {
        callback('Unable to connect to weather services!',undefined)
    }
    else if(body.error){
        callback('Unable to find loction',undefined)
    }
    else{
        const temp=body.currently.temperature
        const precep=body.currently.precipProbability
        callback(undefined,body.daily.data[0].summary+' It is currently '+temp+' degrees out.There is '+precep+'% chance of rain')
    }
})
}

module.exports=forecast
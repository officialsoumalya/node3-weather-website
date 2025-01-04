const request=require('request')

const geocode = (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic291bWFseWExIiwiYSI6ImNrNmFvMzNiZTBzbmozZXFmZTQ5bHE3MTgifQ.KFvuE0VNjuv1ot20LRXMgg&limit=1'
    request({url,json:true},(error,{body}={})=>{
        console.log("body = {}", body);
        if(error){
            //console.log(error);
            callback('Unable to connect to Location services!',undefined)
        }
        else if(body.features.length===0){
            callback('Unable to find location.Try another search',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}


module.exports=geocode

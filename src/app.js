const path= require('path')//core node module
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//console.log(__dirname)
console.log(path.join(__dirname,'../public'))
//console.log(__filename)
const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//setting up handelbars engine and views path and telling hbs where partials is located
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Soumalya'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Soumalya Sahoo'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'Hi!..I am here to help',
        title:'Help',
        name:'Soumalya'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'You must enter an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })

    })
})

app.get('/products',(req,res)=>{
    res.send({
        prodocts:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Help',
        name:'Soumalya',
        errorText:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Soumalya',
        errorText:'Page not found'
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
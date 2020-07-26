const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast.js')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()
 
// Define  paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{ 
        title: 'Weather ',
        name: 'Prashant'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name:'Prashant'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'Help me to find the forecast details',
        name: 'Prashant',
        title: 'Help'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Enter Location'
        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location} /*
            destructured object */ = {}) => {
            if(error){
                return res.send({
                    error
                })  
            }
            // console.log('Error ',error)
            // console.log('Data ',data)
            forecast(latitude, longitude, (error,forecastdata) => {
                if(error){
                    return res.send({
                        error // shorthand
                    })
                }
                res.send({
                    forecast: forecastdata,
                    location,address: req.query.address
                })
            }) 
        })
    }
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Prashant',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Prashant',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query } = require('express')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// app.get('',(req,res)=>{     // esta vacio el string pq es el root del sitio HomePage
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res)=>{     // /help es la pagina que se ejecuta del sitio
//     res.send([{
//         name : 'Walter'
//     },{
//         name : 'Nayet'
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>ABOUT PAGE!</h1>')
// })


//---- code para iniciar hbs para paginas dinamicas-----

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Walter Arguello'
    }) //usamos render para iniciar hbs
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'Walter Arguello'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message : 'This is a help message!',
        title : 'Help',
        name : 'Walter Arguello'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if (error){
            return res.send({
                error:error
            })
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return res.send({error})
            }

            res.send({
                forecast : forecastData,
                location : location,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })  
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        errorMessage:'Help article not found',
        name : 'Walter Arguello'

    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        errorMessage:'Page Not Found',
        name : 'Walter Arguello'

    })
})

app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})
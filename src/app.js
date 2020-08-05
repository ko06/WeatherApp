const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
// app.use('/js', express.static(__dirname + '/public'));

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// app.use('/img',express.static(path.join(__dirname, 'public/images')));
// app.use('/js',express.static(path.join(__dirname, 'public/js')));
// app.use('/css',express.static(path.join(__dirname, 'public/stylesheets')));


app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', '.hbs');

hbs.registerPartials(path.join(__dirname, '../templates/partials'))
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index',{
        name:'selvaganapathi',
        title:'my app'
    })
})


app.get('/help', (req, res) => {
    res.render('help',{info:'please hepl me'})
})

app.get('/about', (req, res) => {
    res.render('about',{info:"about page"})
})

app.get('/weather', (req, res) => {
    console.log(__dirname)

    if(!req.query.address){
        return res.send({
            error: 'Please give address',
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location }) => {
            if (error) {
                return console.log({error, info: ' page'})
            }
    
            forecast(location, latitude, longitude, (error, forecastData) => {
                if (error) {
                    console.log(error)
                    return res.send({error, info: ' page foo',})
                }
    
                // console.log(location)
                //console.log(forecastData)
                return res.send( {
                    info: ' page mu',
                    temp: forecastData.current.temperature,
                    address:req.query.address
                })
            })
        })
    }
    //res.render('weather', {info: 'whether page'})
})

app.get('/help/*', (req, res) => {
    res.send('help page not found')
})
 
app.get('/products', (req, res) => {
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error: 'Please give search item',
        })
    }
    res.send({
        products: [],
    })
})

// app.get('*', (req, res) => {
//     res.send('404 page')
// })

app.listen(3003, () => {
    console.log('Server is up on port 3000.')
})
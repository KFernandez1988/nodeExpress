'use strict'

const filesys = require("fs")
const http = require("http")
const path = require("path")
const url = require("url")

const express =  require('express')
const request = require('request')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let ejs = require('ejs')
const router = express.Router()


app.set("view engine", 'ejs')
app.set("ejs", require('ejs').__express)


router.get('/', (req, res) => {
    res.render("index", {pagename: "HOME"})
})

router.get('/about', (req, res) => {
    res.render("about", {pagename: "ABOUT"})
})

router.get('/registry', (req, res) => {
    res.render("registry", {pagename: "REGISTRY"})
})
router.post('/registry', (req, res) => {
    let {name, address, city, state, zip, gender, consent, age, bio} = req.body
    console.log(name)
    console.log(address)
    console.log(city)
    console.log(state)
    console.log(zip)
    console.log(gender)
    console.log(age)
    console.log(bio)
    console.log(consent)

    let errors = []
    if(name == ''){ errors.push('Name is empty')}
    if(/^[a-zA-Z\s]*$/.test(name) == ''){ errors.push('Invlid name')}
    if(address == ''){ errors.push('addres is empty')}
    if(city == ''){ errors.push('city is empty')}
    if(!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(city)){ errors.push('Invalid city name')}
    if(state == ''){errors.push('state is empty')}
    if(!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(state)){ errors.push('invalid state name')}
    if(zip == ''){errors.push('zip code is empty')}
    if(!/^\d{5}$|^\d{5}-\d{4}$/.test(zip)){errors.push('Invalid zip code')}
    if(gender == "undefined"){ errors.push('Need to check a gender')}
    if(consent != "consented"){ errors.push('We need consent in order to continue')}
    if(bio.length <= 50){ errors.push('Need at least 50 character in your bio')}

    if(errors.length > 0){
        res.render('registry', { pagename: "REGESTRY", errors:errors})
    } else {
        res.redirect('/')
    }
   
})

app.use(express.static('public'))
app.use('/',router)

let server = app.listen('8080', (port) => {
    console.log(`port is running on ${port}`)
})
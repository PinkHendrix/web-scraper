const PORT = 8080 //8000 or your choice
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

//const url = 'https://www.theguardian.com/uk'
const url = 'https://www.worldsurfleague.com/'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []
        //fc-item__title is a class in the 'h3' tag we got from Inspecting Website,  
        $('.content-card-text-wrap', html).each(function () {  
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

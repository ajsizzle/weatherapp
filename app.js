const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = process.env.API_KEY;
    const units = "imperial";
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    http.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherdescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather in " + query + " is currently " + weatherdescription + ".</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " &#8457;.</h1>")
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});


app.listen(process.env.PORT || 5000, function() {
    console.log("Server is running on port 5000.");
    
});



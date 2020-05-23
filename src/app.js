 /*jshint esversion: 6 */
 'use strict';

 /* ------------------------ Require NPM Modules Begin ----------------------- */
 //Require Core Node Module
 const path = require('path');

 // Require Express module
 const express = require('express');
 const app = express();

 //Require hbs module
 const hbs = require('hbs');

 //Require other js files
 const geocode = require('./js/geocode');
 const weatherStack = require("./js/weatherstack");

 //Import the Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

 /* ------------------------------- pathsconfig ------------------------------ */
 const publicPath = path.join(__dirname, '../public/');
 const viewsPath = path.join(__dirname, "../templates/views");
 const partialsPath = path.join(__dirname, "../templates/partials")

 //use the public folder to display the html
 app.use(express.static(publicPath));

 //set the template engine
 app.set('view engine', 'hbs');
 app.set('views', viewsPath);
 hbs.registerPartials(partialsPath);
 /* ------------------------------- pathsconfig ------------------------------ */

 /* ------------------------ Require NPM Modules End ----------------------- */
 //
 /* ------------------------ Get, Post & Listen Requests Begin ----------------------- */
 //
 /* ---------------------------- Get Request Begin --------------------------- */
 //Home route
 app.get("", (req, res) => {
     res.render('index', {
         title: "Weather App"
     });
 });
 // About
 app.get("/about", (req, res) => {
     res.render('about');
 });
 //Help
 app.get("/help", (req, res) => {
     res.render('help');
 });


 //Weather route
 
//  app.get("/weather", (req, res) => {

//     if(!req.query.address){
//         return res.send({
//             error:"You must enter the address"
//         });
//     }

//     /* ------------------------------ MapBox Begin ------------------------------ */
//     geocode.geoCode(req.query.address,(error,{values,place_name,responseError} = {}) => {
//         if(values){
//             const [lat,long] = values;
//             console.log(lat,long)
//             /* --------------------------- Weather Stack Begin -------------------------- */
//             weatherStack.weatherstack(lat, long, (error, {temp,desc,icon,responseError}) => {
//                 if(temp){
//                     return res.render('weather',{
//                         address: req.query.address,
//                         temp: temp,
//                         desc: desc,
//                         icon:icon
//                     })
//                 } else{
//                     return res.send({
//                         weatherConnectionError:error,
//                         weatherConnectionResponseError:responseError
//                     });
//                 }
//             });
//             /* ---------------------------- Weather Stack End --------------------------- */
//         }else {
//             return res.send({
//                 geoConnectionError:error,
//                 geoServiceError:responseError
//             });
//         }
//     });
//     /* ------------------------------ MapBox End ------------------------------ */
//  });


//weather form
app.get("/weatherform", (req,res) =>{
    res.render("weatherform");
});
/*
 //products
app.get("/products",(req,res) => {
    if(!req.query.search){
       return  res.send({
            error:"You must enter the error message"
        })
    }
    res.send({
        products:[]
    })
})

//render if a page not found.
 app.get("/help/*", (req, res) => {
    res.status(404).send("Help Article Not Found");
    //gives error
    //setTimeout(res.redirect("/"),4000);
})
*/

 //render if a page not found.
 app.get("*", (req, res) => {
     res.render("error");
     //gives error
     //setTimeout(res.redirect("/"),4000);
 })

 /* ----------------------------- Get Request End ---------------------------- */
 //
 /* --------------------------- Post Request Begin --------------------------- */
app.post("/weatherform",(req,res) =>{
    console.log(req.body.cityName);
    if(!req.body.cityName){
        return res.send({
            error:"You must enter the address"
        });
    }

    /* ------------------------------ MapBox Begin ------------------------------ */
    geocode.geoCode(req.body.cityName,(error,{values,place_name,responseError} = {}) => {
        if(values){
            const [lat,long] = values;
            console.log(lat,long)
            /* --------------------------- Weather Stack Begin -------------------------- */
            weatherStack.weatherstack(lat, long, (error, {temp,desc,icon,responseError}) => {
                if(temp){
                    return res.render('weather',{
                        address: req.query.address,
                        temp: temp,
                        desc: desc,
                        icon:icon
                    })
                } else{
                    return res.send({
                        weatherConnectionError:error,
                        weatherConnectionResponseError:responseError
                    });
                }
            });
            /* ---------------------------- Weather Stack End --------------------------- */
        }else {
            return res.send({
                geoConnectionError:error,
                geoServiceError:responseError
            });
        }
    });
    /* ------------------------------ MapBox End ------------------------------ */
});
 /* ---------------------------- Post Request End ---------------------------- */
 //
 /* -------------------------- Listen Request Begin -------------------------- */
 app.listen(process.env.PORT || 3000, function () {
     console.log(`Server started at the port ${process.env.PORT || 3000}`);
 });
 /* --------------------------- Listen Request End --------------------------- */
 //
 /* ------------------------ Get Post  & Listen Requests End ----------------------- */
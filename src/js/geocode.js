//jshint esversion:6
'use strict';

//npm module
const request = require('postman-request');

/* ------------------------------ MapBox Begin ------------------------------ */
const geoCode = (address, callBackFn) => {
    const mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=2&access_token=pk.eyJ1IjoibmFnZW5kcmEyMjYiLCJhIjoiY2thYWo3MXJ0MDF5NDJycXl1M21zZXp5eiJ9.JTPj7JxIzrAGw97x6a1dIg";

    /* ------------------------------ Request Begin ----------------------------- */
    request({
        url: mapboxUrl,
        json: true
    }, (error, response) => {
        if (error) {
            callBackFn('Unable to connect to Services! Please try again later', undefined, undefined);
        } else if (response.statusCode = 200) {
            try {
                callBackFn(undefined, {values:response.body.features[0].center,
                    place_name:response.body.features[0].place_name,
                    responseError:null});
            } catch (e) {
                callBackFn(undefined, {values:null,
                    place_name:null,
                    responseError:"Unable to find the Location.Please check the location you have entered"});
            }
        }
    });
    /* ------------------------------- Request End ------------------------------ */

}
/* ------------------------------- MapBox End ------------------------------- */

//Export geocode
module.exports = {
    geoCode
}
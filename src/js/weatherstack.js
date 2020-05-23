//jshint esversion:6
'use strict';

//npm module
const request = require('postman-request');

/* --------------------------- Weather Stack Begin -------------------------- */

const weatherstack = (latitude, longitude, callBackFn) => {
    const weatherStackUrl = `http://api.weatherstack.com/current?access_key=a7ae12b4b2dc730ea6279f02563a1b17&query=${latitude},${longitude}&units=f`;
    request({
        url: weatherStackUrl,
        json: true
    }, (error, response) => {
        if (error) {
            callBackFn("Unable to connect to the services.Please try again later.", undefined);
        } else if (response.statusCode === 200) {
            try {
                callBackFn(undefined, {
                    temp: response.body.current.temperature,
                    desc:response.body.current.weather_descriptions[0],
                    icon:response.body.current.weather_icons[0],
                    responseError:undefined
                });
            }catch(e){
                callBackFn(undefined,{temp:null,
                desc:null,
                responseError:"Invalid Latitude and Longitude."})
            }
        }
    });
}

/* ---------------------------- Weather Stack End --------------------------- */

module.exports = {
    weatherstack
};
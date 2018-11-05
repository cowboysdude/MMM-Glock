/* Magic Mirror
 * Module: MMM-Glock
 *
 * By Cowboysdude
 * 
 */
const NodeHelper = require('node_helper');
const request = require('request');

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting module: " + this.name);
    },

    //query►results►channel►item►condition►

    getStuff: function(url) {
        var city = this.config.city;
        var units = config.units;
        convert = {
            "imperial": "f",
            "metric": "c"
        }
        var searchtext = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='" + convert[config.units] + "'"
        console.log(city);
        request({
            url: "https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json",
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body).query.results.channel.item.condition;
                //console.log(body);
                this.sendSocketNotification('THE_RESULT', result);
            }
        });
    },

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_STUFF') {
            this.getStuff(payload);
        }
        if (notification === 'CONFIG') {
            this.config = payload;
        }
    }
});
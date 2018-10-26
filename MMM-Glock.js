

Module.register("MMM-Glock", {
    defaults: { 
	    updateInterval: 15*60*1000,
		//updateInterval: 5*1000,
		color: "pink",
		size: "",
        inline: "",
        city: "",
        sec: false,
		dcolor: "orange",
		wcolor: "purple",
		useWet: false,
		
		
	 weatherArray : {	
		   "0" :"wi-tornado",
		   "1" :"wi-day-rain",
		   "2" :"wi-hurricane",
		   "3" :"wi-day-thunderstorm",
		   "4" :"wi-day-thunderstorm",
		   "5" :"wi-snow",
		   "6" :"wi-day-sleet",
		   "7" :"wi-day-sleet",
		   "8" :"wi-day-sleet",
		   "9" :"wi-day-sprinkle",
		   "10" :"wi-day-sleet",
		   "11" :"wi-showers",
		  "12" :"wi-showers",
		  "13" :"wi-day-snow",
		  "14" :"wi-day-snow",
		  "15" :"wi-day-snow-wind",
		  "16" :"wi-day-snow",
		  "17" :"wi-day-hail",
		  "18" :"wi-day-sleet",
		  "19" :"wi-dust",
		  "20" :"wi-day-haze",
		  "21" :"wi-day-haze",
		  "22" :"wi-day-haze",
		  "23" :"wi-day-cloudy-windy",
		  "24" :"wi-day-cloudy-windy",
		  "25" :"wi-snowflake-cold",
		  "26" :"wi-day-cloudy",
		  "27" :"wi-night-partly-cloudy", 
		  "28" :"wi-day-cloudy",
		  "29" :"wi-night-alt-cloudy", 
		  "30" :"wi-day-cloudy", 
		  "31" :"wi-night-clear", 
		  "32" :"wi-day-sunny",
		  "33" :"wi-night-clear", 
		  "34" :"wi-day-sunny",
		  "35" :"wi-rain-mix",
		  "36" :"wi-day-sunny",
		  "37" :"wi-day-thunderstorm",
		  "38" :"wi-day-thunderstorm",
		  "39" :"wi-day-thunderstorm",
		  "40" :"wi-showers",
		  "41" :"wi-snow",
		  "42" :"wi-snow",
		  "43" :"wi-snow",
		  "44" :"wi-day-cloudy-high",
		  "45" :"wi-day-thunderstorm",
		  "46" :"wi-snow",
		  "47" :"wi-day-thunderstorm"
	}
		
    },  
     
    start: function() {
        Log.info("Starting module: " + this.name);
		this.updateInterval = null;
		this.info = {};
		this.sendSocketNotification('CONFIG', this.config);
		if (this.config.useWet != false){
		this.getStuff();
		}
        this.Css();
        this.scheduleUpdate();
    },
	
	getStyles: function(){
		return ["MMM-Glock.css"];
	}, 
	
	scheduleUpdate: function() {
        setInterval(() => {
			this.getStuff();
			console.log("getting Glock update");
        }, this.config.updateInterval); 
    },
	
	Css: function() { 
    var pos = {
        "top_center": "top center",
        "bottom_bar": "bottom bar",
        "top_left": "top left",
        "top_right": "top right",
        "top_bar": "top bar",
        "bottom_left": "bottom left",
        "bottom_center": "bottom center",
        "bottom_right": "bottom right",
        "upper_third": "upper third",
        "middle_center": "middle center",
        "lower_third": "lower third"
    }
    var place = pos[this.data.position];
    var color = this.config.color;
	var size = this.config.size;
	//console.log("color: "+color+ " size: "+size);
    var myElement = document.getElementsByClassName('region ' + place)[0];
    myElement.style.cssText = "font-size:"+ size +";color:"+color;   
    }, 
	 
	 getStuff: function() {
       this.sendSocketNotification('GET_STUFF');
		console.log("updating the weather for MMM-Glock"); 
     },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "THE_RESULT") { 
			this.info = payload; 
        }
        this.updateDom();
    },
	
	processWet: function(data) {
        this.info = data;		
    },
	 
	
    getDom: function() {  
		
		var info = this.info;
		//console.log("From getDom "+ info.temp+ " "+info.text); 
        var sec = this.config.sec;
		var dcolor = this.config.dcolor;
		var wcolor = this.config.wcolor;
		var useMe = this.config.useWet;

		setInterval(function() {
			
			var hourEle = document.getElementById("hrMin") 
            var dateEle = document.getElementById("date")
			var dt = new Date();
            			
			if (sec === false) {
			hourEle.innerHTML = dt.getHours() % 12 + ":" + toTwoDigit(dt.getMinutes()) + (dt.getHours() / 12 > 1 ? " P" : " A") + "M";
			} else {
			hourEle.innerHTML = dt.getHours() % 12 + ":" + toTwoDigit(dt.getMinutes()) + ":" + toTwoDigit(dt.getSeconds()) + (dt.getHours() / 12 > 1 ? " P" : " A") + "M";
			}
			var d = dt.toString().slice(0, 15);
			dateEle.style.color = dcolor;
			dateEle.innerHTML = "<open>" + d.slice(0, 4) + "</open><span>" + d.slice(4, 10) + "</span><open>" + d.slice(10, 15)+ "</open>";
		}, 1000)

		function toTwoDigit(num) {
			return (num < 10 ? "0" : "") + num;
		}

        var wrapper = document.createElement("div");

        var da = document.createElement("div");
        da.innerHTML = 
		`<div id="clock">
	     <div id="hrMin"></div> 
         </div>
         <div id="date"></div>`;
        wrapper.appendChild(da); 
		
	 
        if (useMe != false){  
        var weta = document.createElement("div"); 
        weta.classList.add('wet');
        weta.style.color = wcolor;		
		weta.innerHTML = "<img class = invert src= modules/MMM-Glock/svg/"+this.config.weatherArray[info.code]+".svg>"+ "&nbsp;&nbsp;  " +info.temp+"&deg; " +info.text;
		console.log(weta.innerHTML);
        wrapper.appendChild(weta);
		 }
        return wrapper;
    },
});
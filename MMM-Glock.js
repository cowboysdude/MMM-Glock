

	Module.register("MMM-Glock", {
		defaults: { 
			color: "pink",
			size: "",
			inline: "", 
			sec: false,
			dcolor: "orange" 
		},  
		 
		start: function() {
			Log.info("Starting module: " + this.name); 
			this.Css(); 
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
		var myElement = document.getElementsByClassName('region ' + place)[0];
		myElement.style.cssText = "font-size:"+ size +";color:"+color;   
		}, 
		 
		getDom: function() {  
			
			var info = this.info;  
			var sec = this.config.sec;
			var dcolor = this.config.dcolor;
			var wcolor = this.config.wcolor;
			var useMe = this.config.useWet;

			setInterval(function() {
				
				var hourEle = document.getElementById("hrMin") 
				var dateEle = document.getElementById("date")
				var dt = new Date();
							
				if (sec === false) { 
				hourEle.innerHTML = (dt.getHours()% 12 || 12) + ":" + toTwoDigit(dt.getMinutes()) + (dt.getHours() / 12 > 1 ? " P" : " A") + "M";
				} else {
				hourEle.innerHTML = (dt.getHours()% 12 || 12) + ":" + toTwoDigit(dt.getMinutes()) + ":" + toTwoDigit(dt.getSeconds()) + (dt.getHours() / 12 > 1 ? " P" : " A") + "M";
				}
				var d = dt.toString().slice(0, 15);
				dateEle.style.color = dcolor;
				dateEle.innerHTML = "<open>" + d.slice(0, 4) + "</open><span>" + d.slice(4, 10) + "</span><open>" + d.slice(10, 15)+ "</open>";
			}, 1000)

			function toTwoDigit(num) {
				return (num < 10 ? "0" : "") + num;
			}

			var wrapper = document.createElement("div");
			
			
			var total = `<div id="clock">
			 <div id="hrMin"></div> 
			 </div>
			 <div id="date"></div>`;
			 
			 var noDate = `<div id="clock">
			 <div id="hrMin"></div> 
			 </div>`;
			
			var da = document.createElement("div");
			da.innerHTML = total;			 
			wrapper.appendChild(da);  
			 
			return wrapper;
		},
	});

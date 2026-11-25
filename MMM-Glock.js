/* MagicMirror²
 * Module: MMM-Glock
 * A simple 12-hour clock with the date underneath.
 * By cowboysdude
 */
Module.register("MMM-Glock", {
	defaults: {
		color: "white",   // clock color
		size: "1.0em",    // overall size; scales both time and date
		sec: false,       // show seconds
		dcolor: "orange", // date color (month and day number stay white)
		showDate: true    // show the date line
	},

	start: function () {
		Log.info("Starting module: " + this.name);
		this.timeEl = null;
		this.dateEl = null;
		this.scheduleTick();
	},

	getStyles: function () {
		return ["MMM-Glock.css"];
	},

	// Update on each whole second so the display never skips or lags.
	scheduleTick: function () {
		var self = this;
		var delay = 1000 - (Date.now() % 1000);
		this.timer = setTimeout(function () {
			self.updateClock();
			self.scheduleTick();
		}, delay);
	},

	updateClock: function () {
		if (!this.timeEl) {
			return;
		}
		var dt = new Date();
		var hours = dt.getHours();
		var text = (hours % 12 || 12) + ":" + this.pad(dt.getMinutes());
		if (this.config.sec) {
			text += ":" + this.pad(dt.getSeconds());
		}
		text += hours >= 12 ? " PM" : " AM";
		this.timeEl.textContent = text;

		if (this.dateEl) {
			var d = dt.toString().slice(0, 15); // e.g. "Tue Nov 24 2026"
			this.dateEl.innerHTML = d.slice(0, 4) + "<span>" + d.slice(4, 10) + "</span>" + d.slice(10, 15);
		}
	},

	pad: function (num) {
		return (num < 10 ? "0" : "") + num;
	},

	getDom: function () {
		var wrapper = document.createElement("div");
		wrapper.className = "glock";
		wrapper.style.color = this.config.color;
		if (this.config.size) {
			wrapper.style.fontSize = this.config.size;
		}

		this.timeEl = document.createElement("div");
		this.timeEl.className = "glock-time";
		wrapper.appendChild(this.timeEl);

		this.dateEl = null;
		if (this.config.showDate) {
			this.dateEl = document.createElement("div");
			this.dateEl.className = "glock-date";
			this.dateEl.style.color = this.config.dcolor;
			wrapper.appendChild(this.dateEl);
		}

		this.updateClock();
		return wrapper;
	}
});

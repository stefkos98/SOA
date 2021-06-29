"use strict";
const fs = require("fs");
const csv = require("csv-parser");
var data = {};

module.exports = {
	name: "sensor",

	/**
	 * Settings
	 */
	settings: {},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		getMetaData: {
			rest: {
				method: "GET",
				path: "/metaData",
			},
			async handler(ctx) {
				return { "meta": this.settings.metaData.devices[0] };
			},
		},
		postMetaData: {
			rest: {
				method: "POST",
				path: "/metaData",
			},
			async handler(ctx) {
				const params = ctx.params;
				const device = this.settings.metaData;
				if (device.devices[0] == null) return "Device not found";
				if (device.devices[0].type == "sensor") {
					device.devices[0].interval = params.interval;
					if (params.interval) {
						clearInterval(this.settings.intervals[device.devices[0].id]);
						this.settings.intervals[device.devices[0].id] = this.startInterval(
							device.devices[0]
						);
					}
				}
				fs.writeFileSync(
					"sensor.config.json", JSON.stringify(device, undefined, "\t")
				);
				return device;
			},
		},
		putMetaData: {
			rest: {
				method: "PUT",
				path: "/metaData",
			},
			async handler(ctx) {
				const params = ctx.params;
				const device = this.settings.metaData;
				if (device.devices[0] == null) return "Device not found";
				if (device.devices[0].type == "sensor") {
					device.devices[0].interval = params.interval;
					if (params.interval) {
						clearInterval(this.settings.intervals[device.devices[0].id]);
						this.settings.intervals[device.devices[0].id] = this.startInterval(
							device.devices[0]
						);
					}
				}
				fs.writeFileSync(
					"sensor.config.json", JSON.stringify(device, undefined, "\t")
				);
				return device;
			},
		},
		executeCommand: {
			rest: {
				method: "POST",
				path: "/executeCommand",
			},
			async handler(ctx) {
				const params = ctx.params;
				switch (params.command) {
					case "injured": this.logger.info(`Detected ${params.payload.inj} new injuries`); break;
					case "fatalities": this.logger.info(`Detected ${params.payload.fat} new deaths`); break;
					case "loss": this.logger.info(`Detected ${params.payload.lossType} loss`); break;
					case "damage": this.logger.info(`Detected ${params.payload.damageType} `); break;
					default: this.logger.info("Not valid command");
				}
			},
		},
	},

	/**
	 * Events
	 */
	events: {
	},

	/**
	 * Methods
	 */
	methods: {
		startInterval(device) {
			return setInterval(() => {
				if (data.results) {
					const random = Math.round(Math.random() * data.results.length);
					const result = data.results[random];
					result.inj = parseInt(result.inj);
					result.fat = parseInt(result.fat);
					result.loss = parseInt(result.loss);
					if (result.loss > 9 && result.loss < 50) {
						result.loss = 7;
					}
					else if (result.loss >= 50 && result.loss < 500) {
						result.loss = 8;
					}
					else if (result.loss >= 500) {
						result.loss = 9;
					}
					result.yr = parseInt(result.yr);
					this.broker.call("data.postData", { data: result });
				}
			}, device.interval);
		},
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		const config = fs.readFileSync("sensor.config.json");
		this.settings.metaData = JSON.parse(config);
		this.settings.intervals = [];  // ? 
		const results = [];
		fs.createReadStream("Tornadoes.csv")
			.pipe(csv())
			.on("data", (data) => results.push(data))
			.on("end", () => {
				data.results = results;
			});
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		this.logger.info(data.a); //?
		const device = this.settings.metaData.devices[0];
		this.settings.intervals[device.id] = this.startInterval(device);
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {
		for (let interval of this.settings.intervals) {
			if (interval) {
				clearInterval(interval);
			}
		}
	},
};
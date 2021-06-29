module.exports = {
	name: "command",

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
		injuredCommand: {
			rest: {
				method: "POST",
				path: "/injuredCommand",
			},
			async handler(ctx) {
				this.broker.call("sensor.executeCommand", { command: "injured", payload: ctx.params.payload });
			},
		},
		fatalitiesCommand: {
			rest: {
				method: "POST",
				path: "/fatalitiesCommand",
			},
			async handler(ctx) {
				this.broker.call("sensor.executeCommand", { command: "fatalities", payload: ctx.params.payload });
			},
		},
		lossCommand: {
			rest: {
				method: "POST",
				path: "/lossCommand",
			},
			async handler(ctx) {
				this.broker.call("sensor.executeCommand", { command: "loss", payload: ctx.params.payload });
			},
		},
		damageCommand: {
			rest: {
				method: "POST",
				path: "/damageCommand",
			},
			async handler(ctx) {
				this.broker.call("sensor.executeCommand", { command: "damage", payload: ctx.params.payload });
			},
		},
		getMetaDataCommand: {
			rest: {
				method: "GET",
				path: "/getMetaDataCommand",
			},
			async handler(ctx) {
				const res = await this.broker.call("sensor.getMetaData");
				return res;

			},
		},
		postMetaDataCommand: {
			rest: {
				method: "POST",
				path: "/postMetaDataComand",
			},
			async handler(ctx) {
				this.broker.call("sensor.postMetaData", { interval: ctx.params.interval });
			},
		},
		putMetaDataCommand: {
			rest: {
				method: "PUT",
				path: "/putMetaDataCommand",
			},
			async handler(ctx) {
				this.broker.call("sensor.putMetaData", { interval: ctx.params.interval });
			},
		},
	},
	events: {
		"injured-alert": {
			group: "analytics-command", handler(payload) {
				this.broker.call("sensor.executeCommand", { command: "injured", payload: payload });
			}
		},
		"fatalities-alert": {
			group: "analytics-command", handler(payload) {
				this.broker.call("sensor.executeCommand", { command: "fatalities", payload: payload });
			}
		},
		"loss-alert": {
			group: "analytics-command", handler(payload) {
				this.broker.call("sensor.executeCommand", { command: "loss", payload: payload });
			}
		},
		"damage-alert": {
			group: "analytics-command", handler(payload) {
				this.broker.call("sensor.executeCommand", { command: "damage", payload: payload });
			}
		}
	}
}
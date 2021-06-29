const ApiGateway = require('moleculer-web');
const IO = require("socket.io");

module.exports = {
    name: "gateway",
    mixins: [ApiGateway],

    settings: {
        port: process.env.PORT || 3000,
        ip: "0.0.0.0",
        cors: {
            // Configures the Access-Control-Allow-Origin CORS header.
            origin: "*",
            // Configures the Access-Control-Allow-Methods CORS header.
            methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
            // Configures the Access-Control-Allow-Headers CORS header.
            allowedHeaders: ['content-type'],
            // Configures the Access-Control-Expose-Headers CORS header.
            exposedHeaders: [],
            // Configures the Access-Control-Allow-Credentials CORS header.
            credentials: false,
            // Configures the Access-Control-Max-Age CORS header.
            maxAge: 3600
        },
        routes: [
            {
                path: "/api",
                whitelist: ["**"],
                use: [],
                mergeParams: true,

                // Enable authentication. Implement the logic into `authenticate` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authentication
                authentication: false,

                // Enable authorization. Implement the logic into `authorize` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authorization
                authorization: false,

                // The auto-alias feature allows you to declare your route alias directly in your services.
                // The gateway will dynamically build the full routes from service schema.
                autoAliases: true,
                aliases: {
                    "GET /data": "data.getData",
                    "GET /getMetaDataCommand": "command.getMetaDataCommand",
                    "POST /postMetaDataCommand": "command.postMetaDataCommand",
                    "PUT /putMetaDataCommand": "command.putMetaDataCommand",
                    "POST /injuredCommand": "command.injuredCommand",
                    "POST /fatalitiesCommand": "command.fatalitiesCommand",
                    "POST /lossCommand": "command.lossCommand",
                    "POST /damageCommand": "command.damageCommand"
                },
                autoAliases: true
            }
        ],
        assets: {
            folder: "public",

            // Options to `server-static` module
            options: {},
        },
    },
    events: {
        "injured-alert": {
            group: "analytics-command", handler(payload) {
                this.io.emit('newNotification', { command: "injured", payload: payload });
            }
        },
        "fatalities-alert": {
            group: "analytics-command", handler(payload) {
                this.io.emit('newNotification', { command: "fatalities", payload: payload });
            }
        },
        "loss-alert": {
            group: "analytics-command", handler(payload) {
                this.io.emit('newNotification', { command: "loss", payload: payload });
            }
        },
        "damage-alert": {
            group: "analytics-command", handler(payload) {
                this.io.emit('newNotification', { command: "damage", payload: payload });
            }
        }
    },
    started() {
        this.io = IO(this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        this.io.on("connection", client => {
            this.logger.info("Client connected via websocket!");

            client.on("disconnect", () => {
                this.logger.info("Client disconnected");
            });

        });
    }
};
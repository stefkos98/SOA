"use strict";

const DbService = require("../mixins/analytics-db.mixin");
var request = require("request");
module.exports = {
    name: "analytics",
    mixins: [
        DbService("analytics")
    ],
    settings: {
    },
    actions: {
        CEPResponse: {
            rest: {
                method: "POST",
                path: "/CEPResponse",
            },
            async handler(ctx) {
                var result = ctx.params.event;
                if (this.checker == 1) {
                    this.checker++;
                    this.adapter.insert({ inj: result.inj, fat: result.fat, loss: result.loss, mag: result.mag, lossType: result.lossType, damageType: result.damageType });
                }
                switch (result.event) {
                    case 1: this.broker.broadcast("injured-alert",result); break;
                    case 2: this.broker.broadcast("fatalities-alert", result ); break;
                    case 3: this.broker.broadcast("loss-alert",result); break;
                    case 4: this.broker.broadcast("damage-alert",result); break;
                    default:
                }
            },
        },
    },
    events: {
        "analytics.getData": {
            group: "data-analytics",
            handler(payload) {
                this.checker = 1;
                request.post({
                    headers: { 'content-type': 'application/json' },
                    url: `http://siddhi:8006/analytics`,
                    body: `{"inj":${payload.inj},"fat":${payload.fat},"loss":${payload.loss},"mag":${parseInt(payload.mag)}}`
                }, (err, Response, body) => {
                    if (!err) {
                        this.logger.info("SENT MESSAGE");
                    } else {
                        this.logger.info("ERROR");
                    }
                })
            }
        }
    },
    created() {
        this.checker=0;
    }
}
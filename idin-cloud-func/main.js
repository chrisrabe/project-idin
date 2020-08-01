const request = require('request-promise');

const server = "https://idin-server.mybluemix.net";

async function main(params) {
    try {
        const prediction = await request({
            method: "GET",
            uri: server + "/api/v1/prediction",
            json: true
        });
        return prediction;
    } catch (e) {
        return { error: "it failed: " + e };
    }
}

const config = require('config');
const axios = require('axios');
const baseUrl = config.has('server') ? config.get('server').url : undefined;

async function predict() {
  const predEndpoint = `${baseUrl}/api/v1/prediction`;
  const { data } = await axios.get(predEndpoint);
  console.log(data);
  return data;
}

exports.predict = predict;

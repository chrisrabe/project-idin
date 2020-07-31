## Running locally

### Prerequisites
- IBM Account

### Instructions
1. [Set up Cloudant in IBM Cloud](https://cloud.ibm.com/docs/Cloudant/getting-started.html)

2. Inside the `config/default.json` file, replace the following details
```json
  "database": {
    "dbName": "idin_db",
    "cloudantId": "<username>",
    "cloudantApiToken": "<apiKey>"
  }
```
3. Run `npm start`

## Deploying to IBM Cloud Foundry
1. Configure the `config/production.json` with your cloudant credentials

2. Deploy the app
```shell script
ibmcloud login
ibmcloud target --cf
cd idin-server
ibmcloud app push
```

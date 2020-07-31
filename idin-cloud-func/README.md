# IDIN Cloud Function

This folder contains the code you need to paste on your NodeJS cloud function action.
This feature is not supported locally.

## Configuration
Inside the `main.js` script, modify the `<my-server>` value with your deployed IBM Cloud App.

## Set up

### Setting up your IBM Cloud action
1. Go to https://cloud.ibm.com/functions/actions
2. Click `Actions` on the sidebar
3. Click `Create`
4. Select `Action` option
5. Enter name and package
6. Select Node.js 10 for Runtime
7. Press `Create`
8. Copy and paste the code into the code editor

### Setting up your IBM Cloud trigger
1. Go to https://cloud.ibm.com/functions/actions
2. Click `Triggers` on the sidebar
3. Select `Trigger` option
4. Select `Cloudant`
5. From the `Connected Actions` view, click `Add`
6. Press `Select Existing`
7. Choose your the action you created from first part
8. Create

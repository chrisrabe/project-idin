## Running locally

### Prerequisites
- A local server is running
- [NPM and NodeJS](https://www.npmjs.com/get-npm)

### Instructions
1. Install package dependencies
```shell script
npm install
```

2. Configure `config/default.json` like so:

```javascript
  server: {
    baseUrl: 'https://localhost:8080',
    api: ...
```

3. Run `npm start`

## Deploying to Heroku

### Prerequisites
- [Heroku Account](https://signup.heroku.com/)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- [Git CLI](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Instructions
```shell script
rm -rf idin-client/.git
git init
heroku create -b https://github.com/mars/create-react-app-buildpack.git
git add .
git commit -m 'initialise react app'
git push heroku master
heroku open
```

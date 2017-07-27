Chatty App
=====================

A minimal and light chat server that allows multiple connections and conversation through web sockets and ReactJS

### Usage

Clone the chattyApp and create your own git repo.

```
git clone git@github.com:CamLi23/chattyApp.git
cd chattyApp
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start the server.

```

npm install
cd react-simple-boilerplate
npm start
# Open another terminal
cd chattyApp/chatty_server
npm start
open http://localhost:3000
```

### Dependencies

* React
* Webpack
* WS
* Express
* Sass
* node-uuid
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

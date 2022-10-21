//entry point for server.
const colors = require('colors');
const { app, PORT, HOST, MODE } = require('./server');

const server = app.listen(PORT, HOST, () => {
  console.log('ExpressJS server in:');
  console.log(colors.yellow('MODE:', MODE));
  console.log('HOST: %s', HOST);
  console.log('PORT: %s', PORT);
});

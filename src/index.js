//entry point for server.
const colors = require('colors');
const { app, PORT, HOST, MODE } = require('./server');

colors.setTheme({
  modeStyle: ['green', 'inverse', 'bold'],
});
const server = app.listen(PORT, HOST, () => {
  console.log('ExpressJS server in:');
  if (MODE == 'development') console.log('MODE:' + 'development'.modeStyle);
  else console.log('MODE:' + 'production'.modeStyle);
  console.log('HOST: %s', HOST);
  console.log('PORT: %s', PORT);
});

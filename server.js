const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middelware
  //logger
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});
// End of Logger
// app.use((req, res, next) => {
//   res.render('maintance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// HBS HELPERS
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to some some '
  });
});


app.listen(3000, () => {
  console.log('Server is up onport 3000.');
});
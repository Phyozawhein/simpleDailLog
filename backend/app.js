const express =require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/data-routes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH');
  
    next();
  });

app.use('/api/',dataRoutes)
console.log('Listening on http://localhost:5000/')

app.listen(5000);
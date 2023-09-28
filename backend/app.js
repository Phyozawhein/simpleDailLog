const express =require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/data-routes');

const app = express();

app.use(bodyParser.json());
 
app.use((req,res,next)=>{

  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods","POST,GET,PATCH");
  res.setHeader("Access-Control-Allow-Headers","*");
  next();
});



console.log('Listening on http://localhost:5000/');
app.use('/api',dataRoutes);
app.listen(5000);
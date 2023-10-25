const express =require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/data-routes');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
 
app.use((req,res,next)=>{

  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  next();
});


app.use('/api',dataRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

app.listen(5000);
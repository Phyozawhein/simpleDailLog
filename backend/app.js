const express =require('express');
const userRoutes = require('./routes/user-routes');
const packageRoutes = require('./routes/packages-routes');
const app = express();


app.use('/api/login',userRoutes);
app.use('/api/packages',packageRoutes)
console.log('Listening on http://localhost:5000/')

app.listen(5000);
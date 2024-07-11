const express = require('express')
const app = express();
const db=require('./db');  //the database connection which we estabilished in db.js ,here we export that connection
require('dotenv').config();

const bodyParser=require('body-parser');
app.use(bodyParser.json());
const PORT=process.env.PORT||3000;


const Person=require('./models/Person'); //export the person model which we created in person.js
const MenuItem=require('./models/MenuItem');//

app.get('/', function (req, res) {
  res.send('Hello World')
})



//import the router file
const personRoutes=require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuItemRoutes');
//use the routers
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);




app.listen(3000,()=>{
    console.log('server is live')
})




const mongoose=require('mongoose'); //to import mongoose

//making the URL for mongodb connection

const mongoUrl='mongodb://localhost:27017/mydatabase'  //we can replace mydatabase with any name of your database

//set up mongodb connection

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


//mongoose maintains a default connection object representing the MongoDb connection.
const db=mongoose.connection;

//define event listeners for database connection that show us database is connected or not
db.on('connected',()=>{
    console.log('connected to MongoDb server');
});


db.on('error',()=>{
    console.log('MongoDb connection error');
});


db.on('disconnected',()=>{
    console.log('MongoDb disconnected');
});

//Export the database connection
module.exports=db;


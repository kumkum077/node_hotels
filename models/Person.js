const mongoose=require('mongoose');

//define person schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],  //the data will only go to the database if the work is chef or waiter or manager else not
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true

    }

});

//create person model

const Person=mongoose.model('Person',personSchema);
module.exports=Person;
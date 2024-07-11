const express=require('express');
const router=express.Router();
const MenuItem=require('./../models/MenuItem');


//for menu
router.post('/', async(req,res)=>{
    try{
      const data =req.body //the data which client send to server so,before came to server the data is processed or maintain by body parser and body parser stores the data after processing in request.body
  
      const newMenu=new MenuItem(data);//pass the data which we get from req.body
  
  
      //save the new menu to the database
      const response=await newMenu.save();//here we use await because until the complete data will not save it will wait
      console.log('menu saved');
      res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
  
  
  
  })
  
  
  
  router.get('/',async(req,res)=>{
    try{
      const data=await MenuItem.find();
      console.log('data fetched successful');
      res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
  
    }
  })


   //parametarized api
   router.get('/:Taste',async(req,res)=>{           //colun(:) lagate hi Taste ek variable ban gaya
    try{
      const Taste=req.params.Taste;//worktype ek parameter h isliye params.Taste likha h
      if(Taste=='sweet'||Taste=='spicy'||Taste=='sour')
        {
        const response=await MenuItem.find({taste:Taste});
        console.log('response fetched');
        res.status(200).json(response);
  
      }
      else{
        res.status(400).json({error:'Internal work type'});
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
  
    }
  
  })
//comment add for testing purpose

  module.exports=router;
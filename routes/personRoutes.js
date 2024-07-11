const express=require('express');
const router=express.Router();
const Person=require('./../models/Person');

router.post('/', async(req,res)=>{
    try{
      const data =req.body //the data which client send to server so,before came to server the data is processed or maintain by body parser and body parser stores the data after processing in request.body
  
      const newPerson=new Person(data);//pass the data which we get from req.body
  
  
      //save the new person to the database
      const response=await newPerson.save();//here we use await because until the complete data will not save it will wait
      console.log('data saved');
      res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
  })


  
//GET method to get the person data 
router.get('/',async(req,res)=>{
    try{
      const data=await Person.find();
      console.log('data fetched successful');
      res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
  
    }
  })



  //parametarized api
  router.get('/:workType',async(req,res)=>{           //colun(:) lagate hi workType ek variable ban gaya
    try{
      const workType=req.params.workType;//worktype ek parameter h isliye params.worktype likha h
      if(workType=='chef'||workType=='manager'||workType=='waiter')
        {
        const response=await Person.find({work:workType});
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




  //method to update(put method will be used)
router.put('/:id',async(req,res)=>{   //id is a variable here and with the help of id we will be update the data
  try{
    const personId=req.params.id;
    const updatedPersonData=req.body;//updated data for the person

    const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
      new:true,//return the updated document
      runValidators:true,//Run Monggose validation means the validation which we defined for person is checked after updating the data
      
    })

    if(!response){     //this means if the person put the id from which find data and update the data but if id entered by anyone is wrong id for that this is used
      return res.status(404).json({error:'Person not found'});

    }


    console.log('response fetched');
        res.status(200).json(response);

  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});

  }
})


router.delete('/:id',async(req,res)=>{
  try{
    const personId=req.params.id;

    const response = await Person.findByIdAndDelete(personId);
    if(!response){     //this means if the person put the id from which find data and update the data but if id entered by anyone is wrong id for that this is used
      return res.status(404).json({error:'Person not found'});

    }
    console.log('data delete');
        res.status(200).json({message: 'person Deleted successfully'});


  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
    

  }
})


  module.exports=router;//export the router
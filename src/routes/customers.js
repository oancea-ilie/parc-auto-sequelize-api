const express = require("express");

const{Persoana} =require("../models")

let router = express.Router();

router.get("/",async(req,res,next)=>{
    try{

          let customers = await Persoana.findAll();

          if(customers.length >0){

              res.status(200).json(customers);
          }else{
              throw new Error("Nu s-au gasit Customeri!");
          }

    }catch(err){
        next(err);
    }
});


router.get("/:id", async(req,res,next)=>{
    try{
        let {id} = req.params;
        let customer = await Persoana.findByPk(id);
        
        if(customer){
            res.status(200).json(customer);
        }else{
            throw new Error("Nu s-a gasit Customer pentru acest id!");
        }

    }catch(e){

        next(e);
    }
});

router.post("/add", async(req,res,next)=>{
    try{
        let customer = req.body;
        
        if(!customer.name){
            throw new Error(`Name invalid!`);
        }
        else if(!customer.password){
            throw new Error(`Password invalid!`);
        }
        else if(!customer.email){
            throw new Error(`Email invalid!`);
        }
        else if(!customer.phone){
            throw new Error(`Phone invalid!`);
        }
        else{
            let newCustomer = await Persoana.create(customer);
            
            res.status(204).end();
        }

    }catch(e){
        next(e);
    }

});

router.delete("/:id", async(req,res,next)=>{
    try{
        let {id} = req.params;

        let customer = await Persoana.findByPk(id);

        if(customer){
            await customer.destroy();

            res.status(204).end();
        }else{
            throw new Error("Nu s-a gasit Customer cu acest ID!");
        }


    }catch(e){
        next(e);
    }
});

router.put("/:id", async(req,res,next)=>{
    try{
        let {id} = req.params;
        let user = req.body;

        let customer = await Persoana.findByPk(id);

        if(customer){

            if(user.name){
                customer.name = user.name;
            }
            if(user.password){
                customer.password = user.password;
            }
            if(user.email){
                customer.email = user.email;
            }
            if(user.phone){
                customer.phone = user.phone;
            }
            
            await customer.save();
            
            res.status(204).end();
        }else{
            throw new Error("Nu s-a gasit Customer cu acest ID!");
        }

    }catch(e){
        next(e);
    }
});

router.use((err,req,res,next)=>{

    res.status(err.status || 500);

    res.json({
       error:{
           message:err.message
       }
    })
    
});

module.exports = router;
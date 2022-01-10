const express = require("express");

const{Inchirieri,Persoana, Masina} =require("../models");
let router = express.Router();

router.get("/",async(req,res,next)=>{
    try{

          let rentals = await Inchirieri.findAll();

          if(rentals.length >0){

              res.status(200).json(rentals);
          }else{
              throw new Error("Nu s-au gasit Inchirieri!");
          }

    }catch(err){
        next(err);
    }
});

router.get("/by-customer-id/:customerId", async(req,res,next)=>{
    try{
        let {customerId} = req.params;
        console.log(customerId);
        let rez = await Inchirieri.findAll({
            where:{
                personId: customerId
            },
            include:{
                all:true
            },
            order:[['id','DESC']],
            limit:5
        });


        if(rez){
            res.status(200).json(rez);
        }else{
            throw new Error("Nu s-au gasit inchirieri facute de acest customer!");
        }

    }catch(e){

        next(e);
    }
});

router.get("/join", async(req,res,next)=>{
    try{

        let rez = await Inchirieri.findAll({
            include: { 
                all: true,
            },
            order: [['id', 'DESC']],
            limit: 5
        });



        if(rez){
            res.status(200).json(rez);
        }else{
            throw new Error("Nu s-a putut face join-ul!");
        }

    }catch(e){

        next(e);
    }
});

router.get("/:id", async(req,res,next)=>{
    try{
        let {id} = req.params;
        let rental = await Inchirieri.findByPk(id);
        
        if(rental){
            res.status(200).json(rental);
        }else{
            throw new Error("Nu s-a gasit Inchiriere pentru acest id!");
        }

    }catch(e){

        next(e);
    }
});

router.post("/add", async(req,res,next)=>{
    try{
        let rental = req.body;
        
        if(!rental.personId){
            throw new Error(`Person ID invalid!`);
        }
        else if(!rental.masinaId){
            throw new Error(`Masina ID invalid!`);
        }
        else if(!rental.total){
            throw new Error(`Total ID invalid!`);
        }
        else if(!rental.perioada){
            throw new Error(`Perioada invalid!`);
        }
        else{
            let newRental = await Inchirieri.create(rental);
            
            res.status(204).end();
        }

    }catch(e){
        next(e);
    }

});

router.delete("/:id", async(req,res,next)=>{
    try{
        let {id} = req.params;

        let rental = await Inchirieri.findByPk(id);

        if(rental){
            await rental.destroy();

            res.status(204).end();
        }else{
            throw new Error("Nu s-a gasit Inchiriere cu acest ID!");
        }


    }catch(e){
        next(e);
    }
});

router.put("/:id", async(req,res,next)=>{
    try{
        let {id} = req.params;
        let user = req.body;

        let rental = await Inchirieri.findByPk(id);

        if(rental){

            if(user.personId){
                rental.personId = user.personId;
            }
            if(user.masinaId){
                rental.masinaId = user.masinaId;
            }
            if(user.total){
                rental.total = user.total;
            }
            if(user.perioada){
                rental.perioada = user.perioada;
            }
            
            await rental.save();
            
            res.status(204).end();
        }else{
            throw new Error("Nu s-a gasit Inchiriere cu acest ID!");
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
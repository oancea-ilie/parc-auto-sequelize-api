const express = require("express");

const{ Masina} =require("../models")

const {sequelize}=require('../models');
const { QueryTypes } = require('sequelize');

let router = express.Router();

router.get("/",async(req,res,next)=>{
    try{

          let cars = await Masina.findAll();

          if(cars.length >0){

              res.status(200).json(cars);
          }else{
              throw new Error("Nu s-au gasit Masini!");
          }

    }catch(err){
        next(err);
    }
});

router.get("/sort/:id",async(req,res,next)=>{
    try{
        
        let {id} = req.params;
        let sortare = 'DESC';

        if(id == 'populare'){

            let cars = await sequelize.query(`
            select *,  count(masinaId) as popularitate from parc_auto_db.masinas
            inner join inchirieris i on masinas.id = i.masinaId
            group by masinaId
            order by popularitate desc;`, { 
                type: QueryTypes.SELECT 
            });

            res.status(200).json(cars);
            if(cars){
    
                res.status(200).json(cars);
            }else{
    
                throw new Error("Nu s-au gasit Masini Populare!");
            }

        }else{
            if(id =='marca'){
                sortare = 'ASC';
            }
    
            let cars = await Masina.findAll({order: [[id, sortare]]});
    
            if(cars.length >0){
    
                res.status(200).json(cars);
            }else{
    
                throw new Error("Nu s-au gasit Masini Sortate!");
            }
        }

    }catch(err){
        next(err);
    }
});

router.get("/:id", async(req,res,next)=>{
    try{
        let {id} = req.params;
        let car = await Masina.findByPk(id);
        
        if(car){
            res.status(200).json(car);
        }else{
            throw new Error("Nu s-a gasit masina pentru acest id!");
        }

    }catch(e){

        next(e);
    }
});

router.post("/add", async(req,res,next)=>{
    try{
        let car = req.body;
        
        if(!car.marca){
            throw new Error(`Marca invalid!`);
        }
        else if(!car.model){
            throw new Error(`Model invalid!`);
        }
        else if(!car.an){
            throw new Error(`An invalid!`);
        }
        else if(!car.pret){
            throw new Error(`Pret invalid!`);
        }
        else{
            let newCar = await Masina.create(car);
            
            res.status(204).end();
        }

    }catch(e){
        next(e);
    }

});

router.delete("/:id", async(req,res,next)=>{
    try{
        let {id} = req.params;

        let car = await Masina.findByPk(id);

        if(car){
            await car.destroy();

            res.status(204).end();
        }else{
            throw new Error("Nu s-a gasit Masina cu acest ID!");
        }


    }catch(e){
        next(e);
    }
});

router.put("/:id", async(req,res,next)=>{
    try{
        let {id} = req.params;
        let user = req.body;

        let car = await Masina.findByPk(id);

        if(car){

            if(user.img || user.img == null){
                car.img=user.img;
            }
            if(user.marca){
                car.marca=user.marca;
            }
            if(user.model){
                car.model=user.model;
            }
            if(user.an){
                car.an=user.an;
            }
            if(user.pret){
                car.pret=user.pret;
            }
            
            await car.save();
            
            res.status(204).end();
        }else{
            throw new Error("Nu s-a gasit categorie cu acest ID!");
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
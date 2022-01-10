const express = require("express");
const cors = require("cors");
const {sequelize}=require('./src/models');
const carsRouter = require('./src/routes/cars.js');
const customersRouter = require('./src/routes/customers.js');
const rentalsRouter = require('./src/routes/rentals.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());


app.use("/api/cars", carsRouter);
app.use("/api/customers",customersRouter);
app.use("/api/rentals",rentalsRouter);

sequelize.sync()
.then(()=>{
    app.listen(3000,()=>{

        console.log('Api listening on port 3000');
    });
}).catch(e => console.log(e));


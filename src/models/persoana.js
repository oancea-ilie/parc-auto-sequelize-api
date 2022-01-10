const Sequelize = require ('sequelize');

module.exports = (sequelize)=>{

    class Persoana extends Sequelize.Model{}


    Persoana.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },

        name:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'Name can not be null!'
                },
                notEmpty:{
                    msg:'Name can not be empty!'
                },
            },
        },

        password:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Password can not be null!'
                },
                notEmpty:{
                    msg:'Password can not be empty!'
                },
            },
        },

        email:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'Email can not be null!'
                },
                notEmpty:{
                    msg:'Email can not be empty!'
                },
            },
        },

        phone:{
            type:Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Phone can not be null!'
                },
                notEmpty:{
                    msg:'Phone can not be empty!'
                },
            },
        }
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    Persoana.associatiate=(models)=>{
        Persoana.hasMany(models.Inchirieri,{
            as:'CustomersAssociation',
            foreignKey:{
                fieldName:"personId",
                allowNull:false
            },
        });
    };

    return Persoana;
};
const Sequelize = require ('sequelize');

module.exports = (sequelize)=>{

    class Masina extends Sequelize.Model{}
    
    Masina.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },

        img:{
            type:Sequelize.BLOB,
            allowNull: true,
        },

        marca:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Marca can not be null!'
                },
                notEmpty:{
                    msg:'Marca can not be empty!'
                },
            },
        },

        model:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Model can not be null!'
                },
                notEmpty:{
                    msg:'Model can not be empty!'
                },
            },
        },

        an:{
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'An can not be null!'
                },
                notEmpty:{
                    msg:'An can not be empty!'
                },
            },
        },

        pret:{
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Pret can not be null!'
                },
                notEmpty:{
                    msg:'Pret can not be empty!'
                },
            },
        }
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    Masina.associate=(models)=>{
        Masina.hasMany(models.Inchirieri,{
            as:'CarsAssociation',
            foreignKey:{
                fieldName:"masinaId",
                allowNull:false
            },
        });
    };


    return Masina;
};
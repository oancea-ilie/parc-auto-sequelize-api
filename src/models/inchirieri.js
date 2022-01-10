const Sequelize = require ('sequelize');

module.exports = (sequelize)=>{

    class Inchirieri extends Sequelize.Model{}

    Inchirieri.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },
        perioada:{
            type:Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Perioada can not be null!'
                },
                notEmpty:{
                    msg:'Perioada can not be empty!'
                },
            },
        },

        total:{
            type:Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Total can not be null!'
                },
                notEmpty:{
                    msg:'Total can not be empty!'
                },
            },
        }
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });
    Inchirieri.associate=(models)=>{
        Inchirieri.belongsTo(models.Persoana,{
            as:'CustomersAssociation',
            foreignKey:{
                fieldName:"personId",
                allowNull:false
            },
        });

        Inchirieri.belongsTo(models.Masina,{
            as:'CarsAssociation',
            foreignKey:{
                fieldName:"masinaId",
                allowNull:false
            },
        });
    }

    return Inchirieri;
};
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
       
       
        country1: { type: DataTypes.STRING, allowNull: true },
        country_code: { type: DataTypes.STRING, allowNull: true },
        currency: { type: DataTypes.STRING, allowNull: true },
        cr_date: { type: DataTypes.DATE, defaultValue:sequelize.literal('CURRENT_TIMESTAMP') },
        status: { type: DataTypes.INTEGER,  defaultValue: 0 },


    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false, 
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['password'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }        
    };

    return sequelize.define('tbl_countries', attributes, options);
}
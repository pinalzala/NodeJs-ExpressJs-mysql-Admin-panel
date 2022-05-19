const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
       
       
        countryId: { type: DataTypes.INTEGER, defaultValue: 0 },
        cityId: { type: DataTypes.INTEGER, defaultValue: 0 },
        stateName: { type: DataTypes.STRING, allowNull: true },
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

    return sequelize.define('tbl_states', attributes, options);
}
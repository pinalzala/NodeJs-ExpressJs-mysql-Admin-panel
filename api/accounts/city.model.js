const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
       
       
        countryId: { type: DataTypes.INTEGER, defaultValue: 0 },
        stateId: { type: DataTypes.INTEGER, defaultValue: 0 },
        cityName: { type: DataTypes.STRING, allowNull: true },
        cr_date: { type: DataTypes.DATE, defaultValue:sequelize.literal('CURRENT_TIMESTAMP') },
        status: { type: DataTypes.INTEGER,  defaultValue: 0 },


    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false, 
      
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }        
    };

    return sequelize.define('tbl_cities', attributes, options);
}
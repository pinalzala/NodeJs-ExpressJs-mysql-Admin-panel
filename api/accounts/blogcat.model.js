const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
       
       
        txt_catname: { type: DataTypes.STRING,allowNull:true},
        status: { type: DataTypes.INTEGER, defaultValue:0 },
        cr_date: { type: DataTypes.DATE, defaultValue:sequelize.literal('CURRENT_TIMESTAMP') },
        



    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false, 
       
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }        
    };

    return sequelize.define('tbl_blogcategorys', attributes, options);
}
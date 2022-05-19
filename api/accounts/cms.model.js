const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
       
       
        page_name: { type: DataTypes.STRING, allowNull: true},
        page_slug: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.INTEGER, defaultValue:0 },
        description: { type: DataTypes.TEXT, allowNull: true },
        cr_date: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},


       

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

    return sequelize.define('tbl_cms', attributes, options);
}
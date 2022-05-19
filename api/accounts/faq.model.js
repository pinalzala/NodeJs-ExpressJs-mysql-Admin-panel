const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
       
       
        product_id: { type: DataTypes.INTEGER, allowNull: true },
        question: { type: DataTypes.TEXT, allowNull: true},
        answer: { type: DataTypes.TEXT, allowNull: true },
        cr_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },

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

    return sequelize.define('tbl_faqs', attributes, options);
}
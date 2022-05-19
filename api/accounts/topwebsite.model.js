const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        page_name: { type: DataTypes.INTEGER, allowNull: true },
        page_link: { type: DataTypes.STRING, allowNull: true },
        counts: { type: DataTypes.STRING, allowNull: true },
        date: { type: DataTypes.STRING, allowNull: true },

    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false, 
        
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }        
    };

    return sequelize.define('tbl_top_website_pages', attributes, options);
}
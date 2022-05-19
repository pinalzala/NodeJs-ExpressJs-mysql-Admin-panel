const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
       
       
        blog_id: { type: DataTypes.INTEGER, defaultValue:0 },
        tags: { type: DataTypes.STRING, allowNull: true },
        create_date: { type: DataTypes.DATE, defaultValue:sequelize.literal('CURRENT_TIMESTAMP') },
        



    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false, 
       
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }        
    };

    return sequelize.define('tbl_blog_tags', attributes, options);
}
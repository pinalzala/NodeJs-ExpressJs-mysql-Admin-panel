const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
       
       
        banner_image: { type: DataTypes.STRING, allowNull: true },
        banner_caption: { type: DataTypes.TEXT, allowNull: true },
        cr_date: { type: DataTypes.DATE, defaultValue:sequelize.literal('CURRENT_TIMESTAMP')},
        status: { type: DataTypes.INTEGER,  defaultValue: 0 },
        banner_url: { type: DataTypes.TEXT, allowNull: true },
        reference: { type: DataTypes.TEXT, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        title: { type: DataTypes.STRING, allowNull: true },

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

    return sequelize.define('tbl_banner', attributes, options);
}
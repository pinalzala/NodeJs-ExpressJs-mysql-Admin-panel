const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
       
       
        text_desc: { type: DataTypes.TEXT, allowNull: true },
        mobile: { type: DataTypes.STRING, allowNull: true},
        email: { type: DataTypes.STRING, allowNull: true },
        address: { type: DataTypes.TEXT, allowNull: true  },
        worktime: { type: DataTypes.STRING,  allowNull: true},
        latitude: { type: DataTypes.STRING,  allowNull: true},
        longitude: { type: DataTypes.STRING,  allowNull: true},
      
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

    return sequelize.define('tbl_contacts', attributes, options);
}
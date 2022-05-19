const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
       
       
        blog_cats: { type: DataTypes.INTEGER, defaultValue:0 },
        cat_id: { type: DataTypes.INTEGER, defaultValue:0 },
        txt_blogtitle: { type: DataTypes.STRING, allowNull: true },
        createddate: { type: DataTypes.DATE, defaultValue:sequelize.literal('CURRENT_TIMESTAMP') },
        txt_content: { type: DataTypes.TEXT,  allowNull: true},
        txt_mediatype: { type: DataTypes.ENUM("1", "2"), allowNull: true },
        txt_mediautub: { type: DataTypes.TEXT, allowNull: true },
        txt_mediaurl: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.INTEGER, defaultValue: 0 },

        columns: { type: DataTypes.INTEGER, allowNull: true },
        likecount: { type: DataTypes.INTEGER, defaultValue:0 },
        commentcount: { type: DataTypes.INTEGER, defaultValue:0 },
        featured: { type: DataTypes.INTEGER, defaultValue:0 },
        blog_userid: { type: DataTypes.INTEGER, defaultValue:0 },
        editor_pick: { type: DataTypes.INTEGER, defaultValue:0 },
        featured_post: { type: DataTypes.INTEGER, defaultValue:0 },
        video_frame: { type: DataTypes.STRING, allowNull: true  },
        guest_authname_id: { type: DataTypes.INTEGER, allowNull: true},
        guest_authemail: { type: DataTypes.STRING,allowNull: true} ,
        sources: { type: DataTypes.TEXT, allowNull: true },
        txt_blogkeyword: { type: DataTypes.TEXT, allowNull: true },
        meta_description: { type: DataTypes.TEXT, allowNull: true },
        blog_news: { type: DataTypes.INTEGER, defaultValue: 0 },
        thumbimage_name: { type: DataTypes.STRING, allowNull: true },




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

    return sequelize.define('tbl_blogs', attributes, options);
}
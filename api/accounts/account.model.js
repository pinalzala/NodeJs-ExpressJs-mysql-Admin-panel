const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        fname: { type: DataTypes.STRING, allowNull: false },
        lname: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        fbid: { type: DataTypes.STRING, allowNull: true },
        twitterid: { type: DataTypes.STRING, allowNull: true },
        fb_profile_image: { type: DataTypes.STRING, allowNull: true },
        twitter_profile_image:{ type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        mobile: { type: DataTypes.STRING, allowNull: true },
        image: { type: DataTypes.TEXT, allowNull: true },
        subscribtion: { type: DataTypes.INTEGER ,defaultValue:0 },
        status: { type: DataTypes.STRING ,defaultValue:0},
        resetTokenExpires: { type: DataTypes.DATE },
        cr_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        last_login_date: { type: DataTypes.DATE},
        shipping_address: { type: DataTypes.STRING, allowNull: true },
        isadmin: { type: DataTypes.STRING,  defaultValue: 'N' },
        about_us: { type: DataTypes.TEXT, allowNull: true },
        blg_user_type: { type: DataTypes.INTEGER, defaultValue: 0 },
        is_moderator: { type: DataTypes.STRING,defaultValue: 'N' },
        paypal_vis: { type: DataTypes.INTEGER,  defaultValue: 0 },
        fetched: { type: DataTypes.INTEGER,  defaultValue: 0 },
        password_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW  },
        lp_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW  },
        uniqueID: { type: DataTypes.STRING, allowNull: true },
        show_home_video: { type: DataTypes.INTEGER, defaultValue: 1 },
        verificationToken: { type: DataTypes.STRING, allowNull: true },
        resetToken: { type: DataTypes.STRING, allowNull: true },
        resetTokenExpires: { type: DataTypes.DATE, allowNull: true },

        verify: {
            type: DataTypes.VIRTUAL,
            get() { return !!(this.status || this.passwordReset); }
        }
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

    return sequelize.define('tbl_users', attributes, options);
}
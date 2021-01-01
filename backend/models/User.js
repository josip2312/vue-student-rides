module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
            },
            picture: {
                type: DataTypes.STRING,
            },
            contact: {
                type: DataTypes.INTEGER,
            },
            car: {
                type: DataTypes.STRING,
            },
        },
        {
            freezeTableName: true,
        },
    );
    return User;
};

module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define(
        'City',
        {
            cityName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        },
    );
    return City;
};

module.exports = (sequelize, DataTypes) => {
    const Ride = sequelize.define(
        'Ride',
        {
            startTime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'User',
                    key: 'id',
                },
            },
            startCity: {
                type: DataTypes.STRING,

                allowNull: false,
            },
            destinationCity: {
                type: DataTypes.STRING,

                allowNull: false,
            },

            seats: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },

        {
            freezeTableName: true,
        },
    );
    return Ride;
};

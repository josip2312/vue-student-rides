module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define(
        'Request',
        {
            // Model attributes are defined here
            requesterId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'User',
                    key: 'id',
                },
            },
            rideId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Ride',
                    key: 'id',
                },
            },
            requestStatus: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },

        {
            freezeTableName: true,
        },
    );
    return Request;
};

module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define(
        'Request',
        {
            // Model attributes are defined here
            requester_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'User',
                    key: 'id',
                },
            },
            ride_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Ride',
                    key: 'id',
                },
            },
            request_status: {
                type: DataTypes.STRING,
                defaultValue: 'Pending',
            },
        },

        {
            freezeTableName: true,
        },
    );
    return Request;
};

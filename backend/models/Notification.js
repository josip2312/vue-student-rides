module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define(
        'Notification',
        {
            senderId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'User',
                    key: 'id',
                },
            },
            receiverId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'User',
                    key: 'id',
                },
            },
            content: {
                type: DataTypes.STRING,
            },
        },

        {
            freezeTableName: true,
        },
    );
    return Notification;
};

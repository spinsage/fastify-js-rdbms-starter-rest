const fastifyPlugin = require('fastify-plugin')
const { DataTypes } = require('sequelize');

async function models(server, options, next) {

    const ContactsModel = server.db.define('contacts', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: DataTypes.STRING(45),
        lastName: DataTypes.STRING(45),
        email: DataTypes.STRING(45),
        uid: DataTypes.STRING(45)
    }, {
        tableName: 'contacts',
        timestamps: true
    })

    server.decorate('models', {
        'contacts': ContactsModel
    })

    await server.db.sync();

    next();
}

module.exports = fastifyPlugin(models);
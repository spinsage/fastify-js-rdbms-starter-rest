const fastifyPlugin = require('fastify-plugin')
const fsequelize = require('fastify-sequelize');

async function dbConnector(server, options, next) {

    const sequelizeConfig = {
        instance: 'db',
        autoConnect: true,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        dialect: 'mysql',
    }

    server.register(fsequelize, sequelizeConfig).ready(async () => {

        require('./models/contacts')(server.db)

        const modelDecoration = {}
        server.db.modelManager.models.forEach(model => {
            modelDecoration[model.name] = model
        });

        server.decorate('models', modelDecoration)
        await server.db.sync();

        console.log('DB Ready');
        next();
    })
}

module.exports = fastifyPlugin(dbConnector)

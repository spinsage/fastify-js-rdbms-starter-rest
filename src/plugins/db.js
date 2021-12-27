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

    server.register(fsequelize, sequelizeConfig).ready(() => {
        console.log('DB Ready');
        next();
    })
}

module.exports = fastifyPlugin(dbConnector)
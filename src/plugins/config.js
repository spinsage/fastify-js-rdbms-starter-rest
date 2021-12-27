const fastifyPlugin = require('fastify-plugin')
const fastifyEnv = require('fastify-env')

const schema = {
    type: 'object',
    required: ['SERVER_PORT', 'DB_NAME', 'DB_HOST', 'DB_USER', 'DB_PASS', 'DB_PORT'],
    properties: {
        SERVER_PORT: {
            type: 'string',
            default: 3000
        },
        DB_NAME: {
            type: 'string'
        },
        DB_HOST: {
            type: 'string'
        },
        DB_USER: {
            type: 'string'
        },
        DB_PASS: {
            type: 'string'
        },
        DB_PORT: {
            type: 'number',
            default: 3306
        }
    }
}

async function configReader(server, options, next) {
    server
        .register(fastifyEnv, {
            dotenv: true,
            schema: schema
        })
        .ready((err) => {
            if (err) {
                server.log.error(err);
                process.exit(1);
            }
            next();
        })
}

module.exports = fastifyPlugin(configReader)
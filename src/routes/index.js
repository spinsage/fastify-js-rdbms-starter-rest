const { v4: uuidv4 } = require('uuid')

const routes = async (server) => {

    server.get("/contacts/:id", async (request, response) => {

        const contact = await server.models.contacts.findOne({
            where: {
                uid: request.params.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
            }
        });

        console.log(contact)

        if (!contact) {
            return response.status(400).send()
        } else {
            return response.send(contact)
        }
    })

    server.post("/contacts", async (request, response) => {
        request.body.uid = uuidv4().replace(/-/g, '')

        const createdContact = await server.models.contacts.create(request.body);

        const responsData = createdContact.dataValues;

        delete responsData.id;
        delete responsData.createdAt;
        delete responsData.updatedAt;

        return response.send(responsData)
    })

    server.delete("/contacts/:id", async (request, response) => {

        const deletedCount = await server.models.contacts.destroy({
            where: {
                uid: request.params.id
            }
        });

        if (deletedCount !== 0) {
            return response.status(200).send()
        } else {
            return response.status(400).send()
        }
    })

    server.put("/contacts/:id", async (request, response) => {

        const updateCount = await server.models.contacts.update(request.body, {
            where: {
                uid: request.params.id
            }
        });

        if (updateCount[0] !== 0) {
            return response.status(200).send()
        } else {
            return response.status(400).send()
        }
    })
}

module.exports = routes

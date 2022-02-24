const server = require('./src/app')
const {conn} = require('./src/db')
const port = process.env.PORT || 3001

conn.sync()
// conn.sync({force: true})
    .then(async () => {
        console.log("DB connected!");
        await server.listen(port, () => console.log(`Server listening in port ${port}`))

    })
    .catch((error) => console.log(error))



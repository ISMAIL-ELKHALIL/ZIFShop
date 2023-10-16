const { app } = require("./app");
const { PORT } = require('./config/env');
const { runMongoDB } = require("./config/database")

const port = PORT || 4000;

console.log(port);
app.get('/', (req, res, next) => {

    return res.status(200).send("Hello Sir")

})

runMongoDB().catch(err => console.error(err));

app.listen(port, () => {
    console.log(`Server is running on : http://localhost:${port}/`);
})




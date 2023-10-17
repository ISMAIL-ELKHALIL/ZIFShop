const { connection } = require('mongoose')
const { app } = require("./app");
const { PORT } = require('./config/env');
const { runMongoDB } = require("./config/database")

const port = PORT || 4000;

app.get('/', (req, res, next) => {

    return res.status(200).send("Hello Sir")

})

runMongoDB().catch(err => console.error(err));

connection.on('connected' ,()=>{
    app.listen(port, () => {
        console.log(`Server is running on : http://localhost:${port}/`);
    })
    
})





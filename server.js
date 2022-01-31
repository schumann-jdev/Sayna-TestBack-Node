require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let corsOptions = {
    origin: process.env.URL_ORIGIN
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require('./app/models');
const dbConfig = require('./app/config/db.config');

db.mongoose
    .connect(`mongodb://localhost:27017/auth_db`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB")
    })
    .catch(err => {
        console.error("Connection error ", err);
        process.exit()
    });

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to auth api with node"
    })
});
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`)
});
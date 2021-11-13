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

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to auth api with node"
    })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`)
});
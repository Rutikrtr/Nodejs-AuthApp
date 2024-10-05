const express = require('express');
const app = express();


require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

require('./config/database').connect();

// route import and mount
const user = require("./routes/user");
app.use("/api/v3",user);

// activation

app.listen(PORT, ()=>{
    console.log(`APP is listening on Port ---> ${PORT}`);
})
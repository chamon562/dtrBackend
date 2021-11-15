require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors")


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`✨ Server now running on localhost:${PORT}, we live on cmLive ✨`)
})
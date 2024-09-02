const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyparser = require("body-parser");
var fileUploader = require("express-fileupload");


// ========================================================


const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(fileUploader());
app.use(express.urlencoded(true));
app.use("/uploads", express.static("uploads"));


// ========================================================


var routerUser = require("./routers/userRouter");
const dbObj = require("./config/config");


// ========================================================


app.listen(2005, () => {
    console.log("Server Started at 2005");
})

mongoose.connect(dbObj.dburl).then( () => {
    
    console.log("DB Connected");
    
}).catch( (err) => {

    console.log(err);

})


// ========================================================


app.use("/user", routerUser);


// ========================================================
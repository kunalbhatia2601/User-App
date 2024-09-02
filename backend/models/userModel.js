const mongoose = require("mongoose");


function getUserModel()
{

    let User = new mongoose.Schema({

        Name : {type:String, required:true},
        Email : {type:String, unique:true, required:true},
        DOB : {type:String, required:true},
        ProfilePic : {type:String}

    },
    {
        versionKey : false,
    })

    var UserModel = mongoose.model("AllUsers", User);

    return UserModel;

}

module.exports = {getUserModel};
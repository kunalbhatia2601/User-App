const {getUserModel} = require("../models/userModel");
const UserModel = getUserModel();

const path = require("path");


function doSaveProfile(req, resp)
{

    // console.log(req.body);

    let fileName = "noPic.jpg";
    var filePath = "";

    if(req.files != null)
    {

        fileName = req.body.Email + "__" + req.files.ProfilePic.name;
        
        filePath = path.join(__dirname, "..", "uploads", fileName);

        req.files.ProfilePic.mv(filePath);

    }

    // console.log(fileName + " && " + filePath);

    req.body.ProfilePic = fileName;

    const data = new UserModel(req.body);

    data.save().then( (result) => {

        resp.set("json");
        resp.json({status:true, res:result});

    })
    .catch( (err) => {

        resp.json({status:false, msg:err.message})

    })

}

function doSearchProfile(req, resp)
{

    UserModel.findOne({Email:req.body.Email}).then( (result) => {

        if(result == null)
        {
            resp.send("No Data Found");
        }
        else
            resp.send(result);

    })

}

function doUpdateProfile(req, resp)
{

    let fileName, filePath = "";
        
    if(req.files)
    {

        fileName = req.body.Email + "__" + req.files.ProfilePic.name
        filePath = path.join(__dirname, "..", "uploads", fileName);
        req.files.ProfilePic.mv(filePath);

    }
    else
    {
        fileName = req.body.hdn;
    }


    var {Name, Email, DOB} = req.body;

    UserModel.findOneAndUpdate({Email}, {Name, Email, DOB, ProfilePic:fileName}, {new:true}).then( (result) => {

        resp.set("json");
        resp.json({status:true, res:result});        

    }).catch( (err) => {

        resp.json({status:false, msg:err.message})
        
    })

}


module.exports = {doSaveProfile, doSearchProfile, doUpdateProfile};
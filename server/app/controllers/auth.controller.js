const db = require("../models");
const config = require("../config/auth.config");
const User = db.userDetails;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {  
  User.create({    
      USER_ID: req.body.userID,
      FIRST_NAME: req.body.firstName,
      LAST_NAME: req.body.lastName,
      USER_TYPE: "DFLT",
      ORG: req.body.org,
      ADDR_LINE_1: "",
      ADDR_LINE_2: "",
      CITY: "",
      STATE: "",
      PHONE_NUMBER: 0,
      EMAIL: req.body.email,
      CREATOR_USER_ID: "system",    
      PASSWORD: bcrypt.hashSync(req.body.password, 8)
  })  
		.then(data => {
      console.log("-------------------------------------");
      console.log(res.data);
      console.log("-------------------------------------");
			res.send({ message: "User was registered successfully!" });
		})		
		.catch(err => {		
      console.log("-------------------------------------");
      console.log(err);
      console.log("-------------------------------------");
			res.send({ message: "Error while registering the user!" });
		});
};

exports.signin = (req, res) => {
  console.log("in server side , in signin, userID = " + req.body.userID);
  User.findOne({
    where: {
      USER_ID: req.body.userID
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      
      var passwordIsValid = bcrypt.compare(      
        req.body.password,
        user.PASSWORD
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      console.log("successful login");
      var token = jwt.sign({ id: user.USER_ID }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        userID: user.USER_ID,                
        userType: user.USER_TYPE,
        accessToken: token
      });
    })
    .catch(err => {
      console.log("----------------------------------------");
      console.log(err);
      console.log("----------------------------------------");
      res.status(500).send({ message: err.message });
    });
};

const { logging } = require("../config/db.config");
const db = require("../models");
const userDetails = db.userDetails;
const Op = db.Sequelize.Op;
const express = require("express");
const app = express();

  
// Create and save a new User
exports.create = (req, res) => {
	
	console.log("inside create user in controller");
	// Validate request
	var data = req.body;	
	console.log("req.body = " + req.body);
	console.log("req.body.USER_ID = " + req.body.USER_ID);
	console.log("req.body.user_id = " + req.body.user_id);
	console.log("req.body.userId = " + req.body.userId);

	if(!req.body.USER_ID){
		res.status(400).send({		
			message: "Content cannot be empty"
		});
		return;
	}	

	// Create a user
	const user = {
		user_id: req.body.user_id,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		user_type: req.body.user_type,		
		email: req.body.email,
		password: req.body.password,
		sys_creation_date: req.body.sys_creation_date,
		sys_update_date: req.body.sys_update_date
	};

	// Save in database	
	
	userDetails.create(user)
		.then(data => {					
			console.log("CREATING NEW USER");
			console.log(data);
			res.send(data);			
		})		
		.catch(err => {		
			console.log("User details from GUI are:");
			console.log(user);
			console.log(err);
			res.status(500).send({
				message:
					err.message || "Error occurred while creating the user"
			});
		});
};

// View all Users
exports.findAll = (req,res) => {
	// This piece of code is only to retrieve/search based on firstName		
	
	const firstName = req.query.firstName;
	var condition = firstName ? {firstName: {[Op.like]: '%${firstName}%'}}:null;

	userDetails.findAll({where: condition})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Error occurred while fetching the user details"
			});
		});
};

// Find single user
exports.findOne = (req, res) => {
	// This piece of code is only to retrieve/search user based on userID
	const userID = req.params.userID;

	console.log("inside findOne - userID = "+ userID);

	userDetails.findByPk(userID)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error occurred while fetching details for userID : " + userID
			});
		});
};

// Update single user details
exports.update = (req, res) => {
	// Update details of user based on userID
	const userID = req.params.userID;	
	
	userDetails.update(req.body, {		
		where: {USER_ID: userID}		
	})
		.then(countOfRows => {			
			if(countOfRows == 1){
				res.send({
					message: "User was updated successfully"
				});
			}
			else {
				console.log(userID);				
				res.send({
					message: `Cannot update user with userID=${userID}. Maybe user was not found or request body is empty`
				})
			}
		})
		.catch(err => {			
			console.log(err);
			res.status(500).send({
				message: "Error while updating user with userID : " + userID
			});
		});
};

// Delete single user from system
exports.delete = (req, res) => {
	const userID = req.params.userID;

	userDetails.destroy({
		where: {USER_ID: userID}
	})
		.then(countOfRows => {
			if(countOfRows == 1){
				res.send({
					message: "User was deleted successfully."
				});
			}
			else{
				res.send({
					message: `Cannot delete user with userID: ${userID}. Maybe user wasnt found`
				})
			}			
		})
		.catch(err => {
			res.status(500).send({
				message: "Error while deleting user with userID : " + userID
			});
		});
};

// Delete all users from system
exports.deleteAll = (req, res) => {
	userDetails.destroy({
		where: {},
		truncate: false
	})
		.then(countOfRows => {
			res.send({
				message: `${countOfRows} users were deleted successfully`
			});
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Error occurred while deleting all users"
			});
		});
};

  exports.allAccess = (req, res) => {
	res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
	res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
	res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
	res.status(200).send("Moderator Content.");
  };

// More controllers can be added to search users based on all fields in information
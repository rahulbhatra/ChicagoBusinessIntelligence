const { logging } = require("../config/db.config");
const db = require("../models");
const covidWeekly = db.covidWeekly;
const Op = db.Sequelize.Op;

// View all weekly COVID details
exports.findAll = (req,res) => {
	// This piece of code is only to retrieve/search based on zip code 
    // Just a placeholder to get all results
	const zipCode = req.query.zipCode;
	var condition = zipCode ? {zipCode: {[Op.like]: '%${zipCode}%'}}:null;

	covidWeekly.findAll({where: condition})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Error occurred while fetching the weekly COVID details"
			});
		});
};

// Find single zip code details
/*exports.findOne = (req, res) => {
	// This piece of code is only to retrieve/search weekly COVID data based on zip code
	const zipCode = req.params.zipCode;    

	covidWeekly.findByPk(zipCode)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error occurred while fetching details for zip code and week : " + zipCode
			});
		});
};*/
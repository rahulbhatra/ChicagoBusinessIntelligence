const { logging } = require("../config/db.config");
const db = require("../models");
const unemploymentPoverty = db.unemploymentPoverty;
const Op = db.Sequelize.Op;

// View all unemployment adn poverty data
exports.findAll = (req,res) => {
	// This piece of code is only to retrieve/search based on zip code 
    // Just a placeholder to get all results
	const zipCode = req.query.zipCode;
	var condition = zipCode ? {zipCode: {[Op.like]: '%${zipCode}%'}}:null;

	unemploymentPoverty.findAll({where: condition})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Error occurred while fetching the unemployment and poverty details"
			});
		});
};

/*// Find single zip code details
exports.findOne = (req, res) => {
	// This piece of code is only to retrieve/search unemployment and poverty data based on single zip code
	const zipCode = req.params.zipCode;    

	unemploymentPoverty.findByPk(zipCode)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error occurred while fetching details for zip code : " + zipCode
			});
		});
};*/
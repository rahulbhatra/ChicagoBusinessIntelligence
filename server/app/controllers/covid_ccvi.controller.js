const { logging } = require("../config/db.config");
const db = require("../models");
const covidCCVI = db.covidCCVI;
const Op = db.Sequelize.Op;

// View all COVID CCVI details
exports.findAll = (req,res) => {
	// This piece of code is only to retrieve/search based on geography type.
    // Just a placeholder to get all results
	const geographyType = req.query.geographyType;
	var condition = geographyType ? {geographyType: {[Op.like]: '%${geographyType}%'}}:null;

	covidCCVI.findAll({where: condition})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Error occurred while fetching the COVID CCVI details"
			});
		});
};

/*// Find single zip
exports.findOne = (req, res) => {
	// This piece of code is only to retrieve/search COVID CCVI details based on geography type and zipcode
	const geographyType = req.params.geographyType;
    const zipCode = req.params.code;

	covidCCVI.findByPk(geographyType,zipCode)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error occurred while fetching details for zipCode : " + zipCode
			});
		});
};*/
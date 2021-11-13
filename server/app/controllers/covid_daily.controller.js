const { logging } = require("../config/db.config");
const db = require("../models");
const covidDaily = db.covidDaily;
const Op = db.Sequelize.Op;

// View all daily COVID details
exports.findAll = (req,res) => {
	// This piece of code is only to retrieve/search based on date 
    // Just a placeholder to get all results
	const labReportDate = req.query.labReportDate;
	var condition = labReportDate ? {labReportDate: {[Op.like]: '%${labReportDate}%'}}:null;

	covidDaily.findAll({where: condition})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Error occurred while fetching the daily COVID details"
			});
		});
};

/*// Find single day details
exports.findOne = (req, res) => {
	// This piece of code is only to retrieve/search daily COVID data based on lab report date
	const labReportDate = req.params.labReportDate;    

	covidDaily.findByPk(labReportDate)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error occurred while fetching details for date : " + labReportDate
			});
		});
};*/
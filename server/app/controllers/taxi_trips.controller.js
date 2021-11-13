const { logging } = require("../config/db.config");
const db = require("../models");
const taxiTrips = db.taxiTrips;
const Op = db.Sequelize.Op;

// View all trip details
exports.findAll = (req,res) => {
	// This piece of code is only to retrieve/search based on trip ID. 
    // Just a placeholder to get all results
	const tripID = req.query.tripID;
	var condition = tripID ? {tripID: {[Op.like]: '%${tripID}%'}}:null;

	taxiTrips.findAll({where: condition})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Error occurred while fetching the trip details"
			});
		});
};

/*// Find single trip
exports.findOne = (req, res) => {
	// This piece of code is only to retrieve/search trip based on tripID
	const tripID = req.params.tripID;

	taxiTrips.findByPk(tripID)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error occurred while fetching details for tripID : " + tripID
			});
		});
};*/
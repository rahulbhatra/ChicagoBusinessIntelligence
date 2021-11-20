const { BuildingPermit } = require('../models');
const router = require('express').Router();

router.get('/data', async(req, res) => {
    try {
        var buildingPermitArray = await BuildingPermit.findAll();
        console.log(buildingPermitArray[0])

        res.status(200).json({
            message: 'success',
            rows: buildingPermitArray
        })
    } catch(error) {
        res.status(500).json({
            message: 'Server Error.',
            error: error
        })
    }
})

module.exports = router;
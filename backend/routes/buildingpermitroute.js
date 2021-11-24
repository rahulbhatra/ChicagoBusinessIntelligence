const { response } = require('express');
const { BuildingPermit, CommunityAreaZipCode } = require('../models');
const router = require('express').Router();

router.get('/data', async(req, res) => {
    try {
        var buildingPermitArray = await BuildingPermit.findAll();
        var zipCodeCommunityDict = await getZipCodeCommunityAreaMapping();
        var dataArray = Array(buildingPermitArray.length);

        for(var i = 0; i < buildingPermitArray.length; i ++) {
            var zipCode = buildingPermitArray[i].zipCode;
            dataArray[i] = {
                id: buildingPermitArray[i].id,
                buildingPermitId: buildingPermitArray[i].buildingPermitId,
                permitId: buildingPermitArray[i].permitId,
                permitType: buildingPermitArray[i].permitType,
                address: buildingPermitArray[i].address,
                zipCode: buildingPermitArray[i].zipCode,
                communityArea : zipCodeCommunityDict[zipCode]
            }
            buildingPermitArray[i]['communityArea'] = zipCodeCommunityDict[zipCode];
            console.log(zipCode, 'zipcode comunity are' + zipCodeCommunityDict[zipCode]);
        }

        res.status(200).json({
            message: 'success',
            rows: dataArray
        })
    } catch(error) {
        res.status(500).json({
            message: 'Server Error.',
            error: error
        })
    }
})

const getZipCodeCommunityAreaMapping = async () => {
    var communityAreaZipCodeArray = await CommunityAreaZipCode.findAll();
    var zipCodeCommunityDict = {};
    for(var i = 0; i < communityAreaZipCodeArray.length; i++) {
        var zipCode = communityAreaZipCodeArray[i].communityAreaZipCode;
        var communityArea = communityAreaZipCodeArray[i].communityAreaName;
        if(zipCode in zipCodeCommunityDict == false) {
            zipCodeCommunityDict[zipCode] = communityArea;
        } else {
            zipCodeCommunityDict[zipCode] += ", " + communityArea;
        }
    }
    console.log(zipCodeCommunityDict);
    return zipCodeCommunityDict;
}

module.exports = router;
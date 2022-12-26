const {CommunityAreaZipCode, UnemploymentPovertyData } = require('../models');

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

module.exports = { getZipCodeCommunityAreaMapping }
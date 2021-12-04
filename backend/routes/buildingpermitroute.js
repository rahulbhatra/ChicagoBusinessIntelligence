const { BuildingPermit, CommunityAreaZipCode, UnemploymentPovertyData } = require('../models');
const router = require('express').Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:root@localhost:5432/chicago_business_intelligence');
const {QueryTypes } = require('sequelize');

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

// According to a report published by Crain’s Chicago
// Business (https://www.chicagobusiness.com/private-intelligence/industrialmarket-crazy-right-now), The “little guys”, small businesses, have trouble
// competing with the big players like Amazon and Walmart for warehouse
// spaces. To help small business, a new program has been piloted with the
// name Illinois Small Business Emergency Loan Fund Delta to offer small
// businesses low interest loans of up to $250,000 for those applicants with
// PERMIT_TYPE of PERMIT - NEW CONSTRUCTION in the zip code that has the
// lowest number of PERMIT - NEW CONSTRUCTION applications and PER
// CAPITA INCOME is less than 30,000 for the planned construction site. Both,
// building permits and unemployment, datasets will be used in this report. 

router.get('/emergency-loan', async(req, res) => {
    console.log("here i am");
    try {        
        var result = await getBuildingPermitData();
        res.status(200).json({
            message: 'success',
            rows: result
        })
    } catch(error) {
        console.log("ERROR = " , error);
        res.status(500).json({            
            message: 'Server Error.',
            error: error
        })
    }  
});


const getBuildingPermitData = async () => {
    try {
        var result = await sequelize.query(`select f."zipCode",
        'PERMIT - NEW CONSTRUCTION' as "permitType",
        case when s."buildingPermitCount" IS NOT NULL then s."buildingPermitCount" else 0 end as "buildingPermit",
        json_agg("com"."communityAreaName") as "communityAreas",
        json_agg("unemp"."perCapitaIncome") as "perCapitaIncome"
        from (select "bp"."zipCode"
        from "building_permit" as "bp" group by "bp"."zipCode") as f left outer join
        (select 
        "bp"."zipCode", "bp"."permitType",
        case when "bp"."permitType" = 'PERMIT - NEW CONSTRUCTION' then count("bp"."permitId") else 0 end as "buildingPermitCount"
        from "unemployment_poverty_data" as "unemp" inner join
        "community_area_zipcode" as "com" on "unemp"."areaCode"::INTEGER = "com"."communityAreaNumber" inner join
        "building_permit" as "bp" on "bp"."zipCode" = "com"."communityAreaZipCode"
        where "perCapitaIncome" < 30000 
        and "bp"."permitType" = 'PERMIT - NEW CONSTRUCTION'
        group by "bp"."zipCode", "bp"."permitType") as s on f."zipCode" = s."zipCode"
        inner join "community_area_zipcode" as "com" on f."zipCode" = "com"."communityAreaZipCode"
        inner join "unemployment_poverty_data" as "unemp" on "unemp"."areaCode"::INTEGER = "com"."communityAreaNumber"
        where "unemp"."perCapitaIncome" < 30000
        group by f."zipCode", "permitType", "buildingPermit"
        order by "buildingPermit", f."zipCode";`
        , { type: QueryTypes.SELECT });
        return result;

    } catch(error) {
        
        console.log(error);
        return {};
    }
}


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
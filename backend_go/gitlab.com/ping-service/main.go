package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
	"time"

	"github.com/codingsince1985/geo-golang/google"
	"github.com/kelvins/geocoder"
	_ "github.com/lib/pq"
)

type TAXI_TRIPS_DATA []struct {
	TRIP_ID         string `json:"trip_id"`
	TRIP_START_TIME string `json:"trip_start_timestamp"`
	TRIP_END_TIME   string `json:"trip_end_timestamp"`
	PICKUP_LAT      string `json:"pickup_centroid_latitude"`
	PICKUP_LONG     string `json:"pickup_centroid_longitude"`
	DROPOFF_LAT     string `json:"dropoff_centroid_latitude"`
	DROPOFF_LONG    string `json:"dropoff_centroid_longitude"`
}

type CovidCCVI []struct {
	GeographyType      string   `json:"geography_type"`
	CommunityAreaOrZip string   `json:"community_area_or_zip"`
	CcviScore          string   `json:"ccvi_score"`
	CcviCategory       string   `json:"ccvi_category"`
	Location           Location `json:"location"`
}

type Location struct {
	Type        string    `json:"type"`
	Coordinates []float64 `json:"coordinates"`
}

type CovidDaily []struct {
	LabReportDate string `json:"lab_report_date"`
	TotalCases    string `json:"cases_total"`
	TotalDeaths   string `json:"deaths_total"`
}

type UNEMPLOYMENT_POVERTY_DATA []struct {
	AREA_CODE             string `json:"community_area"`
	AREA_NAME             string `json:"community_area_name"`
	PERCENT_BELOW_POVERTY string `json:"below_poverty_level"`
	PERCENT_UNEMPLOYED    string `json:"unemployment"`
	PER_CAPITA_INCOME     string `json:"per_capita_income"`
}

type BuildingPermit []struct {
	Id              string `json:"id"`
	Permit          string `json:"permit_"`
	PermitType      string `json:"permit_type"`
	ReviewType      string `json:"review_type"`
	StreetNumber    string `json:"street_number"`
	StreetDirection string `json:"street_direction"`
	StreetName      string `json:"street_name"`
	Suffix          string `json:"suffix"`
}

type CovidWeeklyData []struct {
	ZipCode                   string `json:"zip_code"`
	WeekNumber                string `json:"week_number"`
	WeekStartDate             string `json:"week_start"`
	WeekEndDate               string `json:"week_end"`
	CasesPerWeek              string `json:"cases_weekly"`
	CasesCumulative           string `json:"cases_cumulative"`
	PercentPositivePerWeek    string `json:"percent_tested_positive_weekly"`
	PercentPositiveCumulative string `json:"percent_tested_positive_cumulative"`
}

type CommunityAreaZipCode []struct {
	CommunityAreaNumber string `json:"community_area"`
	CommunityAreaName   string `json:"community_area_name"`
}

func checkErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	connStr := "user=postgres dbname=chicago_business_intelligence password=root host=host.docker.internal sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	// defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Printf("\nSuccessfully connected to database!\n")

	for {
		go pingURL("https://google.com")
		go covidCCVI(db)
		go covidDaily(db)
		go taxiTrip(db)
		go unempData(db)
		go buildingPermit(db)
		go covidWeekly(db)
		time.Sleep(12 * time.Hour)
	}

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
	<-stop

	log.Println("Shutting Down")
}

func pingURL(url string) {
	log.Print("Inside pingUrl")
	url = strings.TrimSpace(url)
	_, err := http.Get(url)
	if err != nil {
		log.Println("There was an erro")
	} else {
		log.Println(url)
	}
}

func covidCCVI(db *sql.DB) {
	log.Print("Covid CCVI")
	dropSql := `DROP TABLE IF EXISTS covid_ccvi`
	_, err := db.Exec(dropSql)
	if err != nil {
		panic(err)
	}

	createSql := `CREATE TABLE IF NOT EXISTS "covid_ccvi" 
	(
		"id"   SERIAL , 
		"geographyType" VARCHAR(255), 
		"communityAreaOrZipCode" VARCHAR(255), 
		"ccviScore" DOUBLE PRECISION, 
		"ccviCategory" VARCHAR(255), 
		"latitude" DOUBLE PRECISION, 
		"longitude" DOUBLE PRECISION, 
		"createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
		"updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id")
	);`

	_, createSqlErr := db.Exec(createSql)
	if createSqlErr != nil {
		panic(err)
	}

	var url = "https://data.cityofchicago.org/resource/2ns9-phjk.json"
	res, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}

	body, _ := ioutil.ReadAll(res.Body)

	var covidDataArray CovidCCVI
	json.Unmarshal(body, &covidDataArray)

	// var communityAreaOrZipCode int64
	// var ccviScore float64
	for i := 0; i < len(covidDataArray); i++ {
		communityAreaOrZipCode := covidDataArray[i].CommunityAreaOrZip
		ccviScore, _ := strconv.ParseFloat(covidDataArray[i].CcviScore, 64)
		createdAt := time.Now()
		updatedAt := time.Now()
		lat := covidDataArray[i].Location.Coordinates[1]
		lng := covidDataArray[i].Location.Coordinates[0]
		sql := `insert into covid_ccvi ("geographyType", "communityAreaOrZipCode", "ccviScore", "ccviCategory", "latitude", "longitude", "createdAt", "updatedAt") 
		values($1, $2, $3, $4, $5, $6, $7, $8)`
		_, err := db.Exec(sql, covidDataArray[i].GeographyType, communityAreaOrZipCode, ccviScore, covidDataArray[i].CcviCategory, lat, lng, createdAt, updatedAt)
		if err != nil {
			panic(err)
		}

	}
}

func covidDaily(db *sql.DB) {
	log.Print("Inside coivd daily")
	dropSql := `drop table if exists covid_daily`
	_, err := db.Exec(dropSql)
	if err != nil {
		panic(err)
	}

	createSql := `CREATE TABLE IF NOT EXISTS "covid_daily" (
		"id"   SERIAL , 
		"labReportDate" TIMESTAMP WITH TIME ZONE, 
		"totalCases" BIGINT, 
		"totalDeaths" BIGINT, 
		"createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
		"updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
		PRIMARY KEY ("id"));`

	_, createSqlErr := db.Exec(createSql)
	if createSqlErr != nil {
		panic(err)
	}

	var url = "https://data.cityofchicago.org/resource/naz8-j4nc.json"
	res, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}

	body, _ := ioutil.ReadAll(res.Body)

	var covidDataArray CovidDaily
	json.Unmarshal(body, &covidDataArray)

	// var communityAreaOrZipCode int64
	// var ccviScore float64
	for i := 0; i < len(covidDataArray); i++ {
		// layout is just for formating the string to date format.
		layout := "2006-01-02"
		if len(covidDataArray[i].LabReportDate) == 0 {
			continue
		}
		labReportDate, _ := time.Parse(layout, covidDataArray[i].LabReportDate[0:10])
		totalCases, _ := strconv.ParseInt(covidDataArray[i].TotalCases, 0, 64)
		totalDeaths, _ := strconv.ParseInt(covidDataArray[i].TotalDeaths, 0, 64)
		createdAt := time.Now()
		updatedAt := time.Now()

		fmt.Println(covidDataArray[i].LabReportDate[0:10])
		fmt.Println(labReportDate)

		sql := `insert into covid_daily ("labReportDate", "totalCases", "totalDeaths", "createdAt", "updatedAt") 
		values($1, $2, $3, $4, $5)`
		_, err := db.Exec(sql, labReportDate, totalCases, totalDeaths,
			createdAt, updatedAt)

		if err != nil {
			panic(err)
		}

	}
}

func taxiTrip(db *sql.DB) {
	log.Println("inside taxi trip")
	geocoder.ApiKey = "AIzaSyCkKisr7W-gLnHjsEY55jurta3qb8-IVaw"

	dropSql := `drop table if exists covid_daily`
	_, err := db.Exec(dropSql)
	if err != nil {
		panic(err)
	}

	createSql := `CREATE TABLE IF NOT EXISTS "taxi_trip" 
		(
			"id"   SERIAL , 
			"tripId" VARCHAR(255) UNIQUE, 
			"tripStartTime" TIMESTAMP WITH TIME ZONE, 
			"tripEndTime" TIMESTAMP WITH TIME ZONE, 
			"pickUpLat" DOUBLE PRECISION, 
			"pickUpLon" DOUBLE PRECISION, 
			"dropOffLat" DOUBLE PRECISION, 
			"dropOffLon" DOUBLE PRECISION, 
			"pickUpZip" VARCHAR(255), 
			"dropOffZip" VARCHAR(255), 
			"createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
			"updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
			PRIMARY KEY ("id")
		
			);`

	_, createSqlErr := db.Exec(createSql)
	if createSqlErr != nil {
		panic(createSqlErr)
	}

	var url1 = "https://data.cityofchicago.org/resource/wrvz-psew.json"

	res1, err := http.Get(url1)
	checkErr(err)
	body1, _ := ioutil.ReadAll(res1.Body)

	// jsonString := `[{"trip_id":"14176ffa6e52c6716e37275173f1bf8ee681866f","trip_start_timestamp":"2021-09-30T23:45:00.000","trip_end_timestamp":"2021-09-30T23:45:00.000","trip_seconds":"391","trip_miles":"1.8019","pickup_census_tract":"17031080300","dropoff_census_tract":"17031280100","pickup_community_area":"8","dropoff_community_area":"28","fare":"7.5","tip":"0","additional_charges":"2.36","trip_total":"9.86","shared_trip_authorized":false,"trips_pooled":"1","pickup_centroid_latitude":"41.9074919303","pickup_centroid_longitude":"-87.6357600901","pickup_centroid_location":{"type":"Point","coordinates":[-87.6357600901,41.9074919303]},"dropoff_centroid_latitude":"41.8853000224","dropoff_centroid_longitude":"-87.6428084655","dropoff_centroid_location":{"type":"Point","coordinates":[-87.6428084655,41.8853000224]}}
	// ,{"trip_id":"0577e6cfe99603844b2a60bc046bdd88cbc48ad7","trip_start_timestamp":"2021-09-30T23:45:00.000","trip_end_timestamp":"2021-09-30T23:45:00.000","trip_seconds":"636","trip_miles":"4.2579","pickup_census_tract":"17031062100","dropoff_census_tract":"17031081500","pickup_community_area":"6","dropoff_community_area":"8","fare":"10","tip":"5","additional_charges":"2.83","trip_total":"17.83","shared_trip_authorized":false,"trips_pooled":"1","pickup_centroid_latitude":"41.9426918444","pickup_centroid_longitude":"-87.6517705068","pickup_centroid_location":{"type":"Point","coordinates":[-87.6517705068,41.9426918444]},"dropoff_centroid_latitude":"41.8925077809","dropoff_centroid_longitude":"-87.6262149064","dropoff_centroid_location":{"type":"Point","coordinates":[-87.6262149064,41.8925077809]}}]`

	var taxiTripsArray1 TAXI_TRIPS_DATA
	// json.Unmarshal([]byte(jsonString), &taxiTripsArray1)
	json.Unmarshal(body1, &taxiTripsArray1)

	ctx := context.Background()
	tx, err := db.BeginTx(ctx, nil)
	checkErr(err)

	for i := 0; i < len(taxiTripsArray1); i++ {

		fmt.Println(taxiTripsArray1[i].TRIP_ID)

		tripId := taxiTripsArray1[i].TRIP_ID
		if tripId == "" {
			tripId = "NULL"
		}

		tripStartTime := taxiTripsArray1[i].TRIP_START_TIME
		if tripStartTime == "" {
			tripStartTime = "0000-00-00 00:00:00"
		}

		tripEndTime := taxiTripsArray1[i].TRIP_END_TIME
		if tripEndTime == "" {
			tripEndTime = "0000-00-00 00:00:00"
		}

		pickupLat := taxiTripsArray1[i].PICKUP_LAT
		if taxiTripsArray1[i].PICKUP_LAT == "" {
			pickupLat = "0"
		}

		pickupLon := taxiTripsArray1[i].PICKUP_LONG
		if pickupLon == "" {
			pickupLon = "0"
		}

		dropoffLat := taxiTripsArray1[i].DROPOFF_LAT
		if dropoffLat == "" {
			dropoffLat = "0"
		}

		dropoffLon := taxiTripsArray1[i].DROPOFF_LONG
		if dropoffLon == "" {
			dropoffLon = "0"
		}

		pickUpLatFloat, _ := strconv.ParseFloat(pickupLat, 64)
		pickupLonFloat, _ := strconv.ParseFloat(pickupLon, 64)
		pickUpLocation := geocoder.Location{
			Latitude:  pickUpLatFloat,
			Longitude: pickupLonFloat,
		}

		fmt.Println(pickUpLatFloat)
		fmt.Println(pickupLonFloat)
		fmt.Println(pickUpLocation)

		pickUpAddresses, _ := geocoder.GeocodingReverse(pickUpLocation)
		fmt.Println(&pickUpAddresses)
		pickUpAddress := pickUpAddresses[0]
		pickUpZip := pickUpAddress.PostalCode

		dropoffLatFloat, _ := strconv.ParseFloat(dropoffLat, 64)
		dropoffLonFloat, _ := strconv.ParseFloat(dropoffLon, 64)

		dropoffLocation := geocoder.Location{
			Latitude:  dropoffLatFloat,
			Longitude: dropoffLonFloat,
		}
		dropoffAddresses, _ := geocoder.GeocodingReverse(dropoffLocation)
		dropoffAddress := dropoffAddresses[0]
		dropoffZip := dropoffAddress.PostalCode

		createdAt := time.Now()
		updatedAt := time.Now()

		sql := `INSERT INTO taxi_trip ("tripId", "tripStartTime", "tripEndTime", "pickUpLat", "pickUpLon", "dropOffLat", "dropOffLon", "pickUpZip", 
			"dropOffZip", "createdAt", "updatedAt") values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`

		_, err = db.Exec(
			sql,
			tripId,
			tripStartTime,
			tripEndTime,
			pickupLat,
			pickupLon,
			dropoffLat,
			dropoffLon,
			pickUpZip,
			dropoffZip,
			createdAt, updatedAt)

		_, errCreate := db.Exec(dropSql)
		if errCreate != nil {
			panic(errCreate)
		}
	}

	var url2 = "https://data.cityofchicago.org/resource/m6dm-c72p.json"
	res2, err := http.Get(url2)
	checkErr(err)

	body2, _ := ioutil.ReadAll(res2.Body)
	var taxiTripsArray2 TAXI_TRIPS_DATA
	json.Unmarshal(body2, &taxiTripsArray2)
	for i := 0; i < len(taxiTripsArray2); i++ {

		tripId := taxiTripsArray2[i].TRIP_ID
		if tripId == "" {
			tripId = "NULL"
		}

		tripStartTime := taxiTripsArray2[i].TRIP_START_TIME
		if tripStartTime == "" {
			tripStartTime = "0000-00-00 00:00:00"
		}

		tripEndTime := taxiTripsArray2[i].TRIP_END_TIME
		if tripEndTime == "" {
			tripEndTime = "0000-00-00 00:00:00"
		}

		pickupLat := taxiTripsArray2[i].PICKUP_LAT
		if pickupLat == "" {
			pickupLat = "0"
		}

		pickupLon := taxiTripsArray2[i].PICKUP_LONG
		if pickupLon == "" {
			pickupLon = "0"
		}

		dropoffLat := taxiTripsArray2[i].DROPOFF_LAT
		if dropoffLat == "" {
			dropoffLat = "0"
		}

		dropoffLon := taxiTripsArray2[i].DROPOFF_LONG
		if dropoffLon == "" {
			dropoffLon = "0"
		}

		pickUpLatFloat, _ := strconv.ParseFloat(pickupLat, 64)
		pickupLonFloat, _ := strconv.ParseFloat(pickupLon, 64)
		pickUpLocation := geocoder.Location{
			Latitude:  pickUpLatFloat,
			Longitude: pickupLonFloat,
		}

		fmt.Println(pickUpLatFloat)
		fmt.Println(pickupLonFloat)
		fmt.Println(pickUpLocation)

		pickUpAddresses, _ := geocoder.GeocodingReverse(pickUpLocation)
		pickUpAddress := pickUpAddresses[0]
		pickUpZip := pickUpAddress.PostalCode

		dropoffLatFloat, _ := strconv.ParseFloat(dropoffLat, 64)
		dropoffLonFloat, _ := strconv.ParseFloat(dropoffLon, 64)
		dropoffLocation := geocoder.Location{
			Latitude:  dropoffLatFloat,
			Longitude: dropoffLonFloat,
		}
		dropoffAddresses, _ := geocoder.GeocodingReverse(dropoffLocation)
		dropoffAddress := dropoffAddresses[0]
		dropoffZip := dropoffAddress.PostalCode

		createdAt := time.Now()
		updatedAt := time.Now()

		sql := `INSERT INTO taxi_trip ("tripId", "tripStartTime", "tripEndTime", "pickUpLat", "pickUpLon", "dropOffLat", "dropOffLon", "pickUpZip", 
			"dropOffZip", "createdAt", "updatedAt") values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`

		_, errCreate := db.Exec(
			sql, tripId, tripStartTime, tripEndTime,
			pickupLat, pickupLon, dropoffLat, dropoffLon, pickUpZip, dropoffZip, createdAt, updatedAt)

		if errCreate != nil {
			panic(errCreate)
		}
	}

	err = tx.Commit()
	checkErr(err)
}

func unempData(db *sql.DB) {
	log.Println("Inside unemployment data")
	dropSql := `drop table if exists unemployment_poverty_data;`
	_, err := db.Exec(dropSql)

	if err != nil {
		panic(err)
	}

	createSql := `CREATE TABLE IF NOT EXISTS "unemployment_poverty_data" 
	(
		"id"   SERIAL , 
		"areaCode" VARCHAR(255) UNIQUE, 
		"areaName" VARCHAR(255), 
		"percentBelowPoverty" DOUBLE PRECISION, 
		"percentUnemployed" DOUBLE PRECISION, 
		"perCapitaIncome" DOUBLE PRECISION, 
		"createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
		"updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
		PRIMARY KEY ("id")
	);`

	_, createSqlErr := db.Exec(createSql)
	if createSqlErr != nil {
		panic(err)
	}

	var url = "https://data.cityofchicago.org/resource/iqnk-2tcu.json"

	res, err := http.Get(url)
	checkErr(err)

	body, _ := ioutil.ReadAll(res.Body)
	fmt.Printf("\n body  = ", string(body))

	var unempDataArray UNEMPLOYMENT_POVERTY_DATA
	json.Unmarshal(body, &unempDataArray)

	ctx := context.Background()
	tx, err := db.BeginTx(ctx, nil)
	checkErr(err)

	for i := 0; i < len(unempDataArray); i++ {

		areaCode := unempDataArray[i].AREA_CODE
		if areaCode == "" {
			areaCode = "0"
		}

		areaName := unempDataArray[i].AREA_NAME
		if areaName == "" {
			areaName = "Unknown"
		}

		percentBelowPoverty := unempDataArray[i].PERCENT_BELOW_POVERTY
		if percentBelowPoverty == "" {
			percentBelowPoverty = "0"
		}

		percentUnemployed := unempDataArray[i].PERCENT_UNEMPLOYED
		if percentUnemployed == "" {
			percentUnemployed = "0"
		}

		perCapitaIncome := unempDataArray[i].PER_CAPITA_INCOME
		if perCapitaIncome == "" {
			perCapitaIncome = "0"
		}

		fmt.Println("per capital income", perCapitaIncome)

		sysCreationDate := time.Now()
		sysUpdateDate := time.Now()

		sql := `INSERT INTO UNEMPLOYMENT_POVERTY_DATA ("areaCode", "areaName", "percentBelowPoverty", "percentUnemployed", "perCapitaIncome", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7)`
		_, err = tx.ExecContext(ctx,
			sql,
			areaCode,
			areaName,
			percentBelowPoverty,
			percentUnemployed,
			perCapitaIncome,
			sysCreationDate,
			sysUpdateDate)

		if err != nil {
			fmt.Printf("\n ERROR = ", err)
			fmt.Printf("\n")
			tx.Rollback()
			return
		}

	}

	txErr := tx.Commit()
	checkErr(txErr)
}

func buildingPermit(db *sql.DB) {
	log.Println("Inside building permit")
	googleGeoCoder := google.Geocoder("AIzaSyCkKisr7W-gLnHjsEY55jurta3qb8-IVaw")
	dropSql := `drop table if exists building_permit`
	_, err := db.Exec(dropSql)

	if err != nil {
		panic(err)
	}

	createSql := `CREATE TABLE IF NOT EXISTS "building_permit" 
	(
		"id"   SERIAL , 
		"buildingPermitId" BIGINT, 
		"permitId" BIGINT, 
		"permitType" VARCHAR(255), 
		"address" VARCHAR(255), 
		"zipCode" VARCHAR(255), 
		"latitude" DOUBLE PRECISION, 
		"longitude" DOUBLE PRECISION, 
		"createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
		"updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
		PRIMARY KEY ("id")
	);`

	_, createSqlErr := db.Exec(createSql)
	if createSqlErr != nil {
		panic(err)
	}

	var url = "https://data.cityofchicago.org/resource/building-permits.json"
	res, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}

	body, _ := ioutil.ReadAll(res.Body)

	var buildingPermitArray BuildingPermit
	json.Unmarshal(body, &buildingPermitArray)

	// var communityAreaOrZipCode int64
	// var ccviScore float64
	for i := 0; i < len(buildingPermitArray); i++ {
		// layout is just for formating the string to date format.

		id := buildingPermitArray[i].Id
		permit := buildingPermitArray[i].Permit
		permitType := buildingPermitArray[i].PermitType
		streetNumber := buildingPermitArray[i].StreetNumber
		streetDirection := buildingPermitArray[i].StreetDirection
		streetName := buildingPermitArray[i].StreetName
		suffix := buildingPermitArray[i].Suffix
		address := streetNumber + " " + streetDirection + " " + streetName + " " + suffix
		createdAt := time.Now()
		updatedAt := time.Now()

		location, _ := googleGeoCoder.Geocode(address)

		fmt.Println("Address Before: ", id, permit, permitType, address, createdAt, updatedAt)

		if location != nil {
			fmt.Printf("%s location is (%.6f, %.6f)\n", address, location.Lat, location.Lng)
		} else {
			fmt.Println("got <nil> location")
			continue
		}
		addressAfter, _ := googleGeoCoder.ReverseGeocode(location.Lat, location.Lng)
		if addressAfter != nil {
			fmt.Printf("Address of (%.6f,%.6f) is %s\n", location.Lat, location.Lng, addressAfter.FormattedAddress)
			fmt.Printf("Detailed address: %#v\n", addressAfter)
		} else {
			fmt.Println("got <nil> address")
			continue
		}
		zipCode := addressAfter.Postcode
		fmt.Print("\n")

		sql := `insert into building_permit 
		("buildingPermitId", "permitId", "permitType", "address", "zipCode", "latitude", "longitude", "createdAt", "updatedAt")
		values($1, $2, $3, $4, $5, $6, $7, $8, $9);`
		_, err := db.Exec(sql, id, permit, permitType, address, zipCode, location.Lat, location.Lng, createdAt, updatedAt)

		if err != nil {
			panic(err)
		}
	}
}

func covidWeekly(db *sql.DB) {
	log.Println("Inside covid weekly")
	dropSql := `drop table if exists covid_weekly`
	_, err := db.Exec(dropSql)
	if err != nil {
		panic(err)
	}

	var url = "https://data.cityofchicago.org/resource/yhhz-zm2v.json"

	createSql := `CREATE TABLE IF NOT EXISTS covid_weekly
	(
		"id"   SERIAL , 
		"zipCode" VARCHAR(255), 
		"weekNum" BIGINT, 
		"weekStartDate" TIMESTAMP WITH TIME ZONE, 
		"weekEndDate" TIMESTAMP WITH TIME ZONE, 
		"casesPerWeek" BIGINT, 
		"casesCumulative" BIGINT, 
		"percentPositivePerWeek" DOUBLE PRECISION, 
		"percentPositiveCumulative" DOUBLE PRECISION, 
		"createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
		"updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
		PRIMARY KEY ("id")
	);`

	_, createSqlErr := db.Exec(createSql)
	if createSqlErr != nil {
		panic(err)
	}

	res, err := http.Get(url)
	checkErr(err)

	body, _ := ioutil.ReadAll(res.Body)

	var covidDataArray CovidWeeklyData
	json.Unmarshal(body, &covidDataArray)
	checkErr(err)

	for i := 0; i < len(covidDataArray); i++ {
		zipCode := covidDataArray[i].ZipCode
		weekNum := covidDataArray[i].WeekNumber
		weekStartDate := covidDataArray[i].WeekStartDate
		weekEndDate := covidDataArray[i].WeekEndDate
		casesPerWeek := covidDataArray[i].CasesPerWeek
		casesCumulative := covidDataArray[i].CasesCumulative
		percentPositivePerWeek := covidDataArray[i].PercentPositivePerWeek
		percentPositiveCumulative := covidDataArray[i].PercentPositiveCumulative

		createdAt := time.Now()
		updatedAt := time.Now()

		sql := `INSERT INTO covid_weekly ("zipCode", "weekNum", "weekStartDate", "weekEndDate", "casesPerWeek", 
		"casesCumulative", "percentPositivePerWeek", "percentPositiveCumulative", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`
		_, err = db.Exec(
			sql,
			zipCode,
			weekNum,
			weekStartDate,
			weekEndDate,
			casesPerWeek,
			casesCumulative,
			percentPositivePerWeek,
			percentPositiveCumulative,
			createdAt, updatedAt)

		if err != nil {
			fmt.Printf("\n ERROR = ", err)
			fmt.Printf("\n")
			continue
		}
	}
}

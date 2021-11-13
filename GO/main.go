package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"	
	"time"

	_ "github.com/lib/pq"
)

const (
	DB_USER     = "postgres"
	DB_PASSWORD = "Root00"
	DB_NAME     = "chicago_business_intelligence"
)

type TAXI_TRIPS_DATA []struct {
	TRIP_ID	string `json:"trip_id"` 
	TRIP_START_TIME	string `json:"trip_start_timestamp"`
	TRIP_END_TIME	string `json:"trip_end_timestamp"`
	PICKUP_LAT	string `json:"pickup_centroid_latitude"`
	PICKUP_LONG	string `json:"pickup_centroid_longitude"`
	DROPOFF_LAT	string `json:"dropoff_centroid_latitude"`
	DROPOFF_LONG	string `json:"dropoff_centroid_longitude"`
}

type COVID_CCVI_DATA []struct {
	GEOGRAPHY_TYPE	string `json:"geography_type"`
	CODE	string `json:"community_area_or_zip"`
	CCVI_SCORE	string `json:"ccvi_score"`
	CCVI_CATEGORY	string `json:"ccvi_category"`
}

type COVID_WEEKLY_DATA []struct {
	ZIP_CODE	string `json:"zip_code"`
	WEEK_NUMBER	string `json:"week_number"`
	WEEK_START_DATE	string `json:"week_start"`
	WEEK_END_DATE	string `json:"week_end"`
	CASES_PER_WEEK	string `json:"cases_weekly"`
	CASES_CUMULATIVE	string `json:"cases_cumulative"`
	PERCENT_POSITIVE	string `json:"percent_tested_positive_weekly"`
	PERCENT_POSITIVE_ACCUM	string `json:"percent_tested_positive_cumulative"`
}

type COVID_DAILY_DATA []struct {
	LAB_REPORT_DATE	string `json:"lab_report_date"`
	TOTAL_CASES	string `json:"cases_total"`
	TOTAL_DEATHS	string `json:"deaths_total"`
}

type UNEMPLOYMENT_POVERTY_DATA []struct {	
	AREA_CODE	string `json:"ca"`
	AREA_NAME	string `json:"community_area_name"`
	PERCENT_HOUSING_OCCUPIED	string `json:"percent_of_housing_crowded"`
	PERCENT_BELOW_POVERTY	string `json:"percent_households_below_poverty"`
	PERCENT_UNEMPLOYED	string `json:"percent_aged_16_unemployed"`
}

func checkErr(err error) {
    if err != nil {
        log.Fatal(err)
    }
}

// DB set up
func setupDB() *sql.DB {
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", DB_USER, DB_PASSWORD, DB_NAME)
	db, err := sql.Open("postgres", dbinfo)
   
	checkErr(err)
	
	fmt.Printf("\nSuccessfully connected to database!\n")
	return db
}

func clearTables(db *sql.DB, tableName string) {
	sql := "DELETE FROM "+tableName
	_, err := db.Exec(sql)									
	checkErr(err)
	fmt.Printf("\nSuccessfully deleted from ", tableName)
	fmt.Printf("\n")
}

func UploadTaxiTripsData(db *sql.DB) {	
	//http.HandleFunc("/taxi_trip", func(rw http.ResponseWriter, r *http.Request) {
	var url1 = "https://data.cityofchicago.org/resource/wrvz-psew.json"
	var url2 = "https://data.cityofchicago.org/resource/m6dm-c72p.json" 
		
	res1, err := http.Get(url1)
	checkErr(err)
	
	res2, err := http.Get(url2)
	checkErr(err)

	body1, _ := ioutil.ReadAll(res1.Body)
	body2, _ := ioutil.ReadAll(res2.Body)

	var taxiTripsArray1 TAXI_TRIPS_DATA
	var taxiTripsArray2 TAXI_TRIPS_DATA
	json.Unmarshal(body1, &taxiTripsArray1)
	json.Unmarshal(body2, &taxiTripsArray2)   
   
   ctx := context.Background()
	tx, err := db.BeginTx(ctx, nil)
	checkErr(err)
  
	for i := 0; i < len(taxiTripsArray1); i++ {
								
		tripId := taxiTripsArray1[i].TRIP_ID
		if tripId == "" { tripId = "NULL"}		
		
		tripStartTime := taxiTripsArray1[i].TRIP_START_TIME
		if tripStartTime == "" { tripStartTime = "0000-00-00 00:00:00"}
		 
		tripEndTime := taxiTripsArray1[i].TRIP_END_TIME
		if tripEndTime == "" { tripEndTime = "0000-00-00 00:00:00"}
		
		pickupLat := taxiTripsArray1[i].PICKUP_LAT
		if pickupLat == "" { pickupLat = "0"}
		
		pickupLong := taxiTripsArray1[i].PICKUP_LONG
		if pickupLong == "" { pickupLong = "0"}
		
		dropoffLat := taxiTripsArray1[i].DROPOFF_LAT
		if dropoffLat == "" { dropoffLat = "0"}
		
		dropoffLong := taxiTripsArray1[i].DROPOFF_LONG
		if dropoffLong == "" { dropoffLong = "0"}
		 									
		sysCreationDate := time.Now()						
						
		sql := "INSERT INTO TAXI_TRIPS_DATA (trip_id, trip_start_time, trip_end_time, pickup_lat, pickup_long, dropoff_lat, dropoff_long, pickup_zip, dropoff_zip, sys_creation_date) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
		_, err = tx.ExecContext(ctx, 
										sql,
										tripId, 
										tripStartTime, 
										tripEndTime, 
										pickupLat,
										pickupLong,
										dropoffLat,
										dropoffLong,
										0,
										0,
										sysCreationDate)

			if err != nil {
				fmt.Printf("\n ERROR = ", err)
				fmt.Printf("\n")
				tx.Rollback()
				return
			}
		}
				
		for i := 0; i < len(taxiTripsArray2); i++ {
								
		tripId := taxiTripsArray2[i].TRIP_ID
		if tripId == "" { tripId = "NULL"}		
		
		tripStartTime := taxiTripsArray2[i].TRIP_START_TIME
		if tripStartTime == "" { tripStartTime = "0000-00-00 00:00:00"}
		 
		tripEndTime := taxiTripsArray2[i].TRIP_END_TIME
		if tripEndTime == "" { tripEndTime = "0000-00-00 00:00:00"}
		
		pickupLat := taxiTripsArray2[i].PICKUP_LAT
		if pickupLat == "" { pickupLat = "0"}
		
		pickupLong := taxiTripsArray2[i].PICKUP_LONG
		if pickupLong == "" { pickupLong = "0"}
		
		dropoffLat := taxiTripsArray2[i].DROPOFF_LAT
		if dropoffLat == "" { dropoffLat = "0"}
		
		dropoffLong := taxiTripsArray2[i].DROPOFF_LONG
		if dropoffLong == "" { dropoffLong = "0"}
		 									
		sysCreationDate := time.Now()
				
		sql := "INSERT INTO TAXI_TRIPS_DATA (trip_id, trip_start_time, trip_end_time, pickup_lat, pickup_long, dropoff_lat, dropoff_long, pickup_zip, dropoff_zip, sys_creation_date) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
		_, err = tx.ExecContext(ctx, 
										sql,
										tripId, 
										tripStartTime, 
										tripEndTime, 
										pickupLat,
										pickupLong,
										dropoffLat,
										dropoffLong,
										0,
										0,
										sysCreationDate)

			if err != nil {
				fmt.Printf("\n ERROR = ", err)
				fmt.Printf("\n")
				tx.Rollback()
				return
			}
		}
		
		err = tx.Commit()
		checkErr(err)
	//})
}

func UploadCCVIData(db *sql.DB) {
	//http.HandleFunc("/covid_ccvi", func(rw http.ResponseWriter, r *http.Request) {
	var url = "https://data.cityofchicago.org/resource/xhc6-88s9.json"
		
	res, err := http.Get(url)
	checkErr(err)

	body, _ := ioutil.ReadAll(res.Body)

	var covidDataArray COVID_CCVI_DATA
	json.Unmarshal(body, &covidDataArray)
   
   ctx := context.Background()
	tx, err := db.BeginTx(ctx, nil)
	checkErr(err)
	
	for i := 0; i < len(covidDataArray); i++ {				
		geographyType := covidDataArray[i].GEOGRAPHY_TYPE
		code := covidDataArray[i].CODE
		ccviScore := covidDataArray[i].CCVI_SCORE		
		ccviCategory := covidDataArray[i].CCVI_CATEGORY
		sysCreationDate := time.Now()		
						
		sql := "INSERT INTO COVID_CCVI_DATA (geography_type, code, ccvi_score, ccvi_category, sys_creation_date) VALUES ($1, $2, $3, $4, $5)"
		_, err = tx.ExecContext(ctx, 
										sql,
									 	geographyType, 
									 	code, 
									 	ccviScore, 
									 	ccviCategory, 
									 	sysCreationDate)

			if err != nil {
				fmt.Printf("\n ERROR = ", err)		
				fmt.Printf("\n")		
				tx.Rollback()
				return
			}
		}
		
		err = tx.Commit()
		checkErr(err)
	//})	
}

func UploadCovidWeeklyData(db *sql.DB) {
//http.HandleFunc("/covid_weekly", func(rw http.ResponseWriter, r *http.Request) {
	var url = "https://data.cityofchicago.org/resource/yhhz-zm2v.json"
		
	res, err := http.Get(url)
	checkErr(err)

	body, _ := ioutil.ReadAll(res.Body)

	var covidDataArray COVID_WEEKLY_DATA
	json.Unmarshal(body, &covidDataArray)
   
   ctx := context.Background()
	tx, err := db.BeginTx(ctx, nil)
	checkErr(err)
	
	for i := 0; i < len(covidDataArray); i++ {			
		zipCode := covidDataArray[i].ZIP_CODE
		weekNum := covidDataArray[i].WEEK_NUMBER
		weekStartDate := covidDataArray[i].WEEK_START_DATE
		weekEndDate := covidDataArray[i].WEEK_END_DATE		
		casesPerWeek := covidDataArray[i].CASES_PER_WEEK
		if casesPerWeek == "" { casesPerWeek = "0"}
		
		casesCumulative := covidDataArray[i].CASES_CUMULATIVE
		if casesCumulative == "" { casesCumulative = "0"}
		
		percentPositive := covidDataArray[i].PERCENT_POSITIVE
		if percentPositive == "" { percentPositive = "0"}
		
		percentPosAccum := covidDataArray[i].PERCENT_POSITIVE_ACCUM
		if percentPosAccum == "" { percentPosAccum = "0"}
				
		sysCreationDate := time.Now()				
				
		sql := "INSERT INTO COVID_WEEKLY_DATA (zip_code, week_number, week_start_date, week_end_date, cases_per_week, cases_cumulative, percent_positive, percent_positive_accum, sys_creation_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
		_, err = tx.ExecContext(ctx, 
										sql,
									 	zipCode, 
									 	weekNum, 
									 	weekStartDate, 
									 	weekEndDate,
									 	casesPerWeek,
									 	casesCumulative,
									 	percentPositive,
									 	percentPosAccum,
									 	sysCreationDate)

			if err != nil {
				fmt.Printf("\n ERROR = ", err)
				fmt.Printf("\n")			
				tx.Rollback()
				return
			}
		}
		
		err = tx.Commit()
		checkErr(err)
	//})
}

func UploadCovidDailyData(db *sql.DB) {	
//http.HandleFunc("/covid_daily", func(rw http.ResponseWriter, r *http.Request) {
	var url = "https://data.cityofchicago.org/resource/naz8-j4nc.json"
		
	res, err := http.Get(url)
	checkErr(err)

	body, _ := ioutil.ReadAll(res.Body)

	var covidDataArray COVID_DAILY_DATA
	json.Unmarshal(body, &covidDataArray)
   
   ctx := context.Background()
	tx, err := db.BeginTx(ctx, nil)
	checkErr(err)
	
	for i := 0; i < len(covidDataArray); i++ {
		
		labReportDate := covidDataArray[i].LAB_REPORT_DATE
		if labReportDate == "" { labReportDate = "1900-01-01 00:00:00"}
		
		totalCases := covidDataArray[i].TOTAL_CASES
		if totalCases == "" { totalCases = "0"}
		
		totalDeaths := covidDataArray[i].TOTAL_DEATHS						
		if totalDeaths == "" { totalDeaths = "0"}				
				
		sysCreationDate := time.Now()				
				
		sql := "INSERT INTO COVID_DAILY_DATA (lab_report_date, total_cases, total_deaths, sys_creation_date) VALUES ($1, $2, $3, $4)"
		_, err = tx.ExecContext(ctx, 
										sql,
									 	labReportDate, 
									 	totalCases, 
									 	totalDeaths,
									 	sysCreationDate)

			if err != nil {
				fmt.Printf("\n ERROR = ", err)
				fmt.Printf("\n")			
				tx.Rollback()
				return
			}
		}
		
		err = tx.Commit()
		checkErr(err)
	//})
}

func UploadUnemploymentPovertyData(db *sql.DB) {
//http.HandleFunc("/unemp_data", func(rw http.ResponseWriter, r *http.Request) {
	var url = "https://data.cityofchicago.org/resource/ymyn-s5a8.json"
		
	res, err := http.Get(url)
	checkErr(err)

	body, _ := ioutil.ReadAll(res.Body)

	var unempDataArray UNEMPLOYMENT_POVERTY_DATA
	json.Unmarshal(body, &unempDataArray)
   
   ctx := context.Background()
	tx, err := db.BeginTx(ctx, nil)
	checkErr(err)
	
	for i := 0; i < len(unempDataArray); i++ {
		
		areaCode := unempDataArray[i].AREA_CODE
		if areaCode == "" { areaCode = "0"}
		
		areaName := unempDataArray[i].AREA_NAME
		if areaName == "" { areaName = "Unknown"}
				
		percentHousingOccupied := unempDataArray[i].PERCENT_HOUSING_OCCUPIED
		if percentHousingOccupied == "" { percentHousingOccupied = "0"}
				
		percentBelowPoverty := unempDataArray[i].PERCENT_BELOW_POVERTY
		if percentBelowPoverty == "" { percentBelowPoverty = "0"}
		
		percentUnemployed := unempDataArray[i].PERCENT_UNEMPLOYED		
		if percentUnemployed == "" { percentUnemployed = "0"}						
				
		sysCreationDate := time.Now()				
				
		sql := "INSERT INTO UNEMPLOYMENT_POVERTY_DATA (zip_code, area_code, area_name, percent_housing_occupied, percent_below_poverty, percent_unemployed, sys_creation_date) VALUES ($1, $2, $3, $4, $5, $6, $7)"
		_, err = tx.ExecContext(ctx, 
										sql,
									 	0, 
									 	areaCode, 
									 	areaName,
									 	percentHousingOccupied,
									 	percentBelowPoverty,
									 	percentUnemployed,
									 	sysCreationDate)

			if err != nil {
				fmt.Printf("\n ERROR = ", err)
				fmt.Printf("\n")			
				tx.Rollback()
				return
			}
		}
		
		err = tx.Commit()
		checkErr(err)
	//})
}

func main() {
	db := setupDB()	
	
	tableName := "TAXI_TRIPS_DATA"
	clearTables(db,tableName)
	UploadTaxiTripsData(db)
	
	tableName = "COVID_CCVI_DATA"
	clearTables(db,tableName)
	UploadCCVIData(db)
	
	tableName = "COVID_WEEKLY_DATA"
	clearTables(db,tableName)
	UploadCovidWeeklyData(db)
	
	tableName = "COVID_DAILY_DATA"
	clearTables(db,tableName)
	UploadCovidDailyData(db)
	
	tableName = "UNEMPLOYMENT_POVERTY_DATA"
	clearTables(db,tableName)
	UploadUnemploymentPovertyData(db)
}
package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"time"

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

func checkErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	connStr := "user=postgres dbname=chicago_business_intelligence password=root host=localhost sslmode=disable"
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

	http.HandleFunc("/covid_ccvi", func(rw http.ResponseWriter, r *http.Request) {

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
	})

	http.HandleFunc("/covid_daily", func(rw http.ResponseWriter, r *http.Request) {

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
	})

	http.HandleFunc("/taxi_trip", func(rw http.ResponseWriter, r *http.Request) {
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
			if pickupLat == "" {
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

			sql := "INSERT INTO taxi_trip (tripId, tripStartTime, tripEndTime, pickupLat, pickupLon, dropoffLat, dropoffLon, pickupZip, dropoffZip) values($1, $2, $3, $4, $5, $6, $7, $8, $9)"
			_, err = tx.ExecContext(ctx,
				sql,
				tripId,
				tripStartTime,
				tripEndTime,
				pickupLat,
				pickupLon,
				dropoffLat,
				dropoffLon,
				0,
				0)

			if err != nil {
				fmt.Printf("\n ERROR = ", err)
				fmt.Printf("\n")
				tx.Rollback()
				return
			}
		}

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

			sql := "INSERT INTO TAXI_TRIPS_DATA (tripId, tripStartTime, tripEndTime, pickupLat, pickupLon, dropoffLat, dropoffLon, pickupZip, dropoffZip) values($1, $2, $3, $4, $5, $6, $7, $8, $9)"
			_, err = tx.ExecContext(ctx,
				sql,
				tripId,
				tripStartTime,
				tripEndTime,
				pickupLat,
				pickupLon,
				dropoffLat,
				dropoffLon,
				0,
				0)

			if err != nil {
				fmt.Printf("\n ERROR = ", err)
				fmt.Printf("\n")
				tx.Rollback()
				return
			}
		}

		err = tx.Commit()
		checkErr(err)
	})

	http.ListenAndServe(":9090", nil)
}

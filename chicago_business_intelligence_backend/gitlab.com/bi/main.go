package main

import (
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

type CovidCCVI []struct {
	GeographyType      string `json:"geography_type"`
	CommunityAreaOrZip string `json:"community_area_or_zip"`
	CcviScore          string `json:"ccvi_score"`
	CcviCategory       string `json:"ccvi_category"`
	// Location           LocationJson `json:"location"`
}

// type LocationJson struct {
// 	Type        string `json:"type"`
// 	Coordinates string `json:"coordinates"`
// }
type CovidDaily []struct {
	LabReportDate string `json:"lab_report_date"`
	TotalCases    string `json:"cases_total"`
	TotalDeaths   string `json:"deaths_total"`
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
			communityAreaOrZipCode, _ := strconv.ParseInt(covidDataArray[i].CommunityAreaOrZip, 0, 8)
			ccviScore, _ := strconv.ParseFloat(covidDataArray[i].CcviScore, 8)
			createdAt := time.Now()
			updatedAt := time.Now()
			sql := `insert into covid_ccvi ("geographyType", "communityAreaOrZipCode", "ccviScore", "ccviCategory", "createdAt", "updatedAt") 
			values($1, $2, $3, $4, $5, $6)`
			_, err := db.Exec(sql, covidDataArray[i].GeographyType, communityAreaOrZipCode, ccviScore, covidDataArray[i].CcviCategory,
				createdAt, updatedAt)

			if err != nil {
				panic(err)
			}

		}
	})

	http.HandleFunc("/covid_daily", func(rw http.ResponseWriter, r *http.Request) {
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
			labReportDate, _ := time.Parse(layout, covidDataArray[i].LabReportDate)
			totalCases, _ := strconv.ParseInt(covidDataArray[i].TotalCases, 0, 8)
			totalDeaths, _ := strconv.ParseInt(covidDataArray[i].TotalDeaths, 0, 8)
			createdAt := time.Now()
			updatedAt := time.Now()
			sql := `insert into covid_daily ("labReportDate", "totalCases", "totalDeaths", "createdAt", "updatedAt") 
			values($1, $2, $3, $4, $5)`
			_, err := db.Exec(sql, labReportDate, totalCases, totalDeaths,
				createdAt, updatedAt)

			if err != nil {
				panic(err)
			}

		}
	})

	http.ListenAndServe(":9090", nil)
}

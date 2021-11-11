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

type CovidJsonArray []struct {
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

	http.HandleFunc("/covid_data", func(rw http.ResponseWriter, r *http.Request) {
		var url = "https://data.cityofchicago.org/resource/2ns9-phjk.json"
		res, err := http.Get(url)
		if err != nil {
			log.Fatal(err)
		}

		body, _ := ioutil.ReadAll(res.Body)

		var covidDataArray CovidJsonArray
		json.Unmarshal(body, &covidDataArray)

		// var communityAreaOrZipCode int64
		// var ccviScore float64
		for i := 0; i < len(covidDataArray); i++ {
			communityAreaOrZipCode, _ := strconv.ParseInt(covidDataArray[i].CommunityAreaOrZip, 0, 8)
			ccviScore, _ := strconv.ParseFloat(covidDataArray[i].CcviScore, 8)
			createdAt := time.Now()
			updatedAt := time.Now()
			sql := `insert into covid ("geographyType", "communityAreaOrZipCode", "ccviScore", "ccviCategory", "createdAt", "updatedAt") 
			values($1, $2, $3, $4, $5, $6)`
			_, err := db.Exec(sql, covidDataArray[i].GeographyType, communityAreaOrZipCode, ccviScore, covidDataArray[i].CcviCategory,
				createdAt, updatedAt)

			if err != nil {
				panic(err)
			}

		}
	})

	http.ListenAndServe(":9090", nil)
}

func buildSql(GeographyType string, CommunityAreaOrZip int64, CcviScore float64, CcviCategory string) string {
	return fmt.Sprintf("insert into covids (geographyType, communityAreaOrZipCode, ccviScore, ccviCategory)"+
		"values(%s, %s, %s, %s)", GeographyType, CommunityAreaOrZip, CcviScore, CcviCategory)
}

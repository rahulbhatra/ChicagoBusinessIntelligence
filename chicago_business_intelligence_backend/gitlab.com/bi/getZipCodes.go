package main

import (	
	"database/sql"	
	"fmt"
	"log"		
	"time"	
	"github.com/kelvins/geocoder"

	_ "github.com/lib/pq"
)

const (
	DB_USER     = "postgres"
	DB_PASSWORD = "root"
	DB_NAME     = "chicago_business_intelligence"
)

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

func getZipCodes(db *sql.DB){

	geocoder.ApiKey = "AIzaSyCctDVzYHUX6D4mXEAqbn3WoUkkOXjg3oU"
	rows, err := db.Query("SELECT latitude,longitude FROM lat_long_list")
	checkErr(err)
	
	defer rows.Close()
 
	for rows.Next() {
		var latitude, longitude float64
							
		latitude = 0
		longitude = 0		
		airport:="No"	
		err := rows.Scan(&latitude, &longitude)
		checkErr(err)		
		//fmt.Println("\n", latitude, longitude)
		
		// Set the latitude and longitude
		location := geocoder.Location{
			Latitude:  latitude,
			Longitude: longitude,
		}		
		if latitude != 0 && longitude != 0 {
			addresses, err := geocoder.GeocodingReverse(location)
			checkErr(err)
			address := addresses[0]			
			if(address.PostalCode == "60666" || address.PostalCode == "60638"){
				airport="Yes"
			}
			sysCreationDate := time.Now()
			sql := "INSERT INTO LAT_LONG_ZIP_MAPPING (latitude, longitude, postal_code, airport, sys_creation_date) VALUES ($1, $2, $3, $4, $5)"
			_, err = db.Exec(sql,									 	 
								latitude,
								longitude,
								address.PostalCode,
								airport,
								sysCreationDate)
			checkErr(err)											
		}				
	}
 
	err = rows.Err()
	checkErr(err)	
}

func main() {
	db := setupDB()			
	getZipCodes(db)
}
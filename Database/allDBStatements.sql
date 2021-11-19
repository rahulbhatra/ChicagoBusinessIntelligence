----------------------------- CREATE NEW USER AND DATABASE ------------------------------
CREATE USER postgres WITH PASSWORD 'root';
CREATE DATABASE chicago_business_intelligence;

-----------------------------------------------------------------------------------------
--------------------------------- ALL CREATE STATEMENTS ---------------------------------
/*
List of unique coordinates
*/
CREATE TABLE LAT_LONG_LIST
(
LATITUDE NUMERIC,
LONGITUDE NUMERIC,
SYS_CREATION_DATE TIMESTAMP,
PRIMARY KEY (LATITUDE,LONGITUDE)
);

/*
Coordinates and zip code mapping
*/
CREATE TABLE LAT_LONG_ZIP_MAPPING
(
LATITUDE NUMERIC,
LONGITUDE NUMERIC,
POSTAL_CODE VARCHAR(10),
AIRPORT VARCHAR(5),
SYS_CREATION_DATE TIMESTAMP,
PRIMARY KEY (LATITUDE,LONGITUDE)
);

/*
User details table
*/
CREATE TABLE USER_DETAILS
(
USER_ID VARCHAR(50) PRIMARY KEY,
FIRST_NAME VARCHAR(50) NOT NULL,
LAST_NAME VARCHAR(50) NOT NULL,
USER_TYPE VARCHAR(4) NOT NULL,
EMAIL VARCHAR(50),
PASSWORD VARCHAR(255),
SYS_CREATION_DATE TIMESTAMP NOT NULL,
SYS_UPDATE_DATE TIMESTAMP NOT NULL
);

/*
Taxi Trip Data:
https://data.cityofchicago.org/Transportation/Taxi-Trips/wrvz-psew
https://data.cityofchicago.org/Transportation/Transportation-Network-Providers-Trips/m6dm-c72p/data
*/
CREATE TABLE TAXI_TRIPS_DATA
(
TRIP_ID VARCHAR(50) PRIMARY KEY,
TRIP_START_TIME TIMESTAMP NOT NULL,
TRIP_END_TIME TIMESTAMP NOT NULL,
PICKUP_LAT NUMERIC NOT NULL,
PICKUP_LONG NUMERIC NOT NULL,
DROPOFF_LAT NUMERIC NOT NULL,
DROPOFF_LONG NUMERIC NOT NULL,
PICKUP_ZIP VARCHAR(10) NOT NULL,
DROPOFF_ZIP VARCHAR(10) NOT NULL,
SYS_CREATION_DATE TIMESTAMP NOT NULL
);

/*
Covid CCVI Data:
https://data.cityofchicago.org/Health-Human-Services/Chicago-COVID-19-Community-Vulnerability-Index-CCV/xhc6-88s9/data
*/
CREATE TABLE COVID_CCVI_DATA
(
GEOGRAPHY_TYPE VARCHAR(10) NOT NULL,
CODE NUMERIC NOT NULL,
CCVI_SCORE NUMERIC NOT NULL,
CCVI_CATEGORY VARCHAR(10) NOT NULL,
SYS_CREATION_DATE TIMESTAMP NOT NULL,
PRIMARY KEY (GEOGRAPHY_TYPE, CODE)
);

/*
Covid Weekly Data:
https://www.chicago.gov/city/en/depts/bldgs/dataset/building_permits.html
*/
CREATE TABLE COVID_WEEKLY_DATA
(
ZIP_CODE NUMERIC NOT NULL,
WEEK_NUMBER NUMERIC NOT NULL,
WEEK_START_DATE DATE NOT NULL,
WEEK_END_DATE DATE NOT NULL,
CASES_PER_WEEK NUMERIC NOT NULL,
CASES_CUMULATIVE NUMERIC NOT NULL,
PERCENT_POSITIVE NUMERIC NOT NULL,
PERCENT_POSITIVE_ACCUM NUMERIC NOT NULL,
SYS_CREATION_DATE TIMESTAMP NOT NULL,
PRIMARY KEY (ZIP_CODE, WEEK_NUMBER, WEEK_START_DATE)
);

/*
Covid Daily Data:
https://data.cityofchicago.org/Health-Human-Services/COVID-19-Daily-Cases-Deaths-and-Hospitalizations/naz8-j4nc/data
*/
CREATE TABLE COVID_DAILY_DATA
(
LAB_REPORT_DATE DATE PRIMARY KEY,
TOTAL_CASES NUMERIC NOT NULL,
TOTAL_DEATHS NUMERIC NOT NULL,
SYS_CREATION_DATE TIMESTAMP NOT NULL
);

/*
Unemployment and Poverty Data
https://data.cityofchicago.org/Health-Human-Services/Unemployment/ymyn-s5a8
*/
CREATE TABLE UNEMPLOYMENT_POVERTY_DATA
(
ZIP_CODE NUMERIC NOT NULL,
AREA_CODE NUMERIC NOT NULL,
AREA_NAME VARCHAR(50),
PERCENT_HOUSING_OCCUPIED NUMERIC NOT NULL,
PERCENT_BELOW_POVERTY NUMERIC NOT NULL,
PERCENT_UNEMPLOYED NUMERIC NOT NULL,
SYS_CREATION_DATE TIMESTAMP NOT NULL,
PRIMARY KEY (ZIP_CODE, AREA_CODE)
);
-----------------------------------------------------------------------------------------
--------------------------------- ALL SELECT STATEMENTS ---------------------------------
select * from TAXI_TRIPS_DATA;
select * from COVID_CCVI_DATA;
select * from COVID_WEEKLY_DATA;
select * from COVID_DAILY_DATA;
select * from UNEMPLOYMENT_POVERTY_DATA;
sleect * from USER_DETAILS;
-----------------------------------------------------------------------------------------
--------------------------------- ALL DROP STATEMENTS ---------------------------------
drop table TAXI_TRIPS_DATA;
drop table COVID_CCVI_DATA;
drop table COVID_WEEKLY_DATA;
drop table COVID_DAILY_DATA;
drop table UNEMPLOYMENT_POVERTY_DATA;
drop table USER_DETAILS;
-----------------------------------------------------------------------------------------


use chicago_business_intelligence;
drop procedure if exists lat_long_list;

CREATE OR REPLACE PROCEDURE lat_long_list()
LANGUAGE plpgsql
AS $$
DECLARE
	v_lat numeric;
	v_long numeric;
	v_postalcode numeric default 0;
	v_airport varchar(5) default 'N';
	cursor1 cursor for
		select lat,long from
		(select distinct pickup.pickup_lat as lat, pickup.pickup_long as long from taxi_trips_data pickup
			union
		select distinct dropoff.dropoff_lat as lat,dropoff.dropoff_long as long from taxi_trips_data dropoff) combined;
BEGIN

	delete from LAT_LONG_LIST;
	
	OPEN cursor1;
	loop
		fetch cursor1 into v_lat, v_long;
		exit when not found;			
		insert into lat_long_list values(v_lat,v_long,now());
	end loop;
	CLOSE cursor1;    	
	commit;    	
END;$$

call lat_long_list();

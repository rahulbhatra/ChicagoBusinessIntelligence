#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Nov 24 13:02:36 2021

@author: anjaliv
"""

# Python
import pandas as pd
from prophet import Prophet
from flask import Flask
from flask_restful import Resource, Api
from flask import make_response, request
from sqlalchemy import create_engine

app = Flask(__name__)
api = Api(app)

# Create an engine instance
alchemyEngine   = create_engine('postgresql+psycopg2://postgres:root@localhost:5432/chicago_business_intelligence', pool_recycle=3600);

# Connect to PostgreSQL server
dbConnection    = alchemyEngine.connect();

class Taxi_Trips(Resource):
    def get(self):
        # Python
        #df = pd.read_csv('./Taxi_Trips.csv')
        # Read data from PostgreSQL database table and load into a DataFrame instance
        zipCode = request.args.get('zip_code')
        interval = request.args.get('interval')
        intervalString = interval
        
        df = pd.read_sql("select DATE(\"tripStartTime\") as ds,\"dropOffZip\" as zipCode,count(*) as y from taxi_trip where \"pickUpZip\" !='' and \"dropOffZip\"='"+str(zipCode)+"' group by DATE(\"tripStartTime\"),\"dropOffZip\" order by DATE(\"tripStartTime\"),count(*) desc;", dbConnection);        
        df.head()      
        
        # Python
        m = Prophet()        
        m.fit(df)
        

        # Python
        interval = request.args.get('interval') 
        if interval == 'D':                    
            future = m.make_future_dataframe(periods=10, freq='D')
            intervalString='Daily'
            future.tail()
        elif interval == 'W':            
            future = m.make_future_dataframe(periods=10, freq='W')
            intervalString='Weekly'
            future.tail()
        elif interval == 'M':                      
            future = m.make_future_dataframe(periods=10, freq='M')
            intervalString='Monthly'
            future.tail()        
        elif interval == 'Y':                
            future = m.make_future_dataframe(periods=10, freq='Y')
            intervalString='Yearly'
            future.tail()        

        # Python
        forecast = m.predict(future)
        forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail()
        
        forecast['ds'] = forecast['ds'].dt.strftime('%Y-%m-%d')
        data = forecast[['ds','yhat']]          
        data.insert(0,'id', range(0,len(data)))        
        data.insert(1,'zipCode', zipCode) 
        data.insert(2,'interval', intervalString) 
        data = data.rename(columns={"ds":"date","yhat":"forecast_value"})
        data['forecast_value'] = data['forecast_value'].round(decimals=2)        
        out = data.to_json(orient='records')
                
        return make_response(out, 200)        


api.add_resource(Taxi_Trips, '/taxiTripsForecast')  # add endpoints

if __name__ == '__main__':
    app.run()  # run our Flask app

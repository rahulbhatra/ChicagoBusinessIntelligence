#!/usr/bin/env python
# coding: utf-8

# In[32]:


import pandas as pd


# In[174]:


zipCodeCommunityArea = pd.read_excel('ZipCodeCommunityArea.xlsx')
# for i in range(len(zipCodeCommunityArea)):
#     print(zipCodeCommunityArea.loc[i])


# In[175]:


communityAreaNumberName = pd.read_excel('CommunityAreaNumberName.xlsx')
# print(communityAreaNumberName)


# In[180]:


data = []
for i in range(len(zipCodeCommunityArea)):
    zipCode = zipCodeCommunityArea.loc[i, 'Zip Code']
    communityAreas = zipCodeCommunityArea.loc[i, 'Community Area'].split(",")
#     print(zipCode, communityAreas)
    for j in range(len(communityAreaNumberName)):
        areaNumber = communityAreaNumberName.loc[j, 'AREA_NUMBE']
        community = communityAreaNumberName.loc[j, 'COMMUNITY']
        for communityArea in communityAreas:
            if communityArea.lower().replace(" ", "") == community.lower().replace(" ", ""):
                print("Area Number", areaNumber, "Community", community, "ZipCode" , zipCode, "ZipCode Community", communityArea)
                data.append([areaNumber, community, zipCode])
                
data = sorted(data)
for i in range(len(data)):
    print(data[i])
    
print(len(data))
        


# In[181]:


import psycopg2 as pg
from psycopg2 import Error
from datetime import date
import numpy as np

try:
    conn = pg.connect("dbname=chicago_business_intelligence user=postgres password=root")

    cursor = conn.cursor()
    
    drop_sql_query = '''drop table if exists community_area_zipcode;'''
    cursor.execute(drop_sql_query)
    
    
    # SQL query to create a new table
    create_table_query = '''CREATE TABLE IF NOT EXISTS "community_area_zipcode" ("id"   SERIAL , 
    "communityAreaNumber" BIGINT, "communityAreaName" VARCHAR(255), 
    "communityAreaZipCode" VARCHAR(255), 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("id")
    );'''
    # Execute a command: this creates a new table
    cursor.execute(create_table_query)
    
    for i in range(len(data)):
        print(data[i])
        
        createdAt = date.today()
        updatedAt = date.today()

        insert_query = '''INSERT INTO community_area_zipcode ("communityAreaNumber", 
        "communityAreaName", "communityAreaZipCode", "createdAt", "updatedAt") VALUES (%s, %s, %s, %s, %s);'''
        areaNumber, community, zipCode = data[i]
        print("here i am")
        print(areaNumber.dtype)
        item_tuple = (int(areaNumber), community, str(zipCode), createdAt, updatedAt)
        print(item_tuple)
        cursor.execute(insert_query, item_tuple)
    
    
    conn.commit()
    print("Table created successfully in PostgreSQL ")

except (Exception, Error) as error:
    print("Error while connecting to PostgreSQL", error)
finally:
    if conn:
        cursor.close()
        conn.close()
        print("PostgreSQL connection is closed")


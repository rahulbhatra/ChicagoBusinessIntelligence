# ChicagoBusinessIntelligence

Frontend Setup:
    1. cd chicago_business_intelligence
    2. npm install
    3. npm start

Backend Setup:
    Note:- Create chicago_business_intelligence database in postgresql and do the required setting in folder backend/config
    1. cd backend
    2. npm install
    3. npm start

Go Microservice Running Using Api's:
    1. cd chicago_business_intelligence_backend/gitlab.com/bi
    2. go run main.go

Go Microservices Running Using Docker and Kubernetes:
    1. cd chicago_business_intelligence_backend/gitlab.com/ping-service
    2. Follow instructions in the readme file under it.

Forecasting:
    1. cd Prophet
    2. run forecastData.ipynb or forecastData.py // install dependecies if not installed already


Line of Code estimate: 100,000 lines of code

Features Implemented:
    1. User Session & Authentication
    2. Autherization
    3. Covid Reports
        The business intelligence reports are geared towardtracking and forecasting events that have direct or indirect impacts onbusinesses and neighborhoods in different zip codes within the city ofChicago. The business intelligence reports will be used to send alerts to taxidrivers about the state of COVID-19 in the different zip codes in order toavoid taxi drivers to be the super spreaders in the different zip codes andneighborhoods. For this report, we will use taxi trips and daily COVID-19datasets for the city of Chicago.
    4. Taxi Trips Information
        There are two major airports within the city of Chicago:O’Hare and Midway. And we are interested to track trips from these airportsto the different zip codes and the reported COVID-19 positive test cases.The city of Chicago is interested to monitor the traffic of the taxi trips fromthese airports to the different neighborhoods and zip codes.
    5. Traffic Patterns Forecast
        For streetscaping investment and planning, the city ofChicago is interested to forecast daily, weekly, and monthly traffic patternsutilizing the taxi trips for the different zip codes.
    6. Social Economy Information
        For industrial and neighborhood infrastructure investment,the city of Chicago is interested to invest in top 5 neighborhoods withhighest unemployment rate and poverty rate and waive the fees forbuilding permits in those neighborhoods in order to encourage businessesto develop and invest in those neighborhoods. Both, building permits andunemployment, datasets will be used in this report.
    7. Emergency Business Loans
        According to a report published by Crain’s ChicagoBusiness (https://www.chicagobusiness.com/private-intelligence/industrialmarket-crazy-right-now), The “little guys”, small businesses, have troublecompeting with the big players like Amazon and Walmart for warehousespaces. To help small business, a new program has been piloted with thename Illinois Small Business Emergency Loan Fund Delta to offer smallbusinesses low interest loans of up to $250,000 for those applicants withPERMIT_TYPE of PERMIT - NEW CONSTRUCTION in the zip code that has thelowest number of PERMIT - NEW CONSTRUCTION applications and PERCAPITA INCOME is less than 30,000 for the planned construction site. Both,building permits and unemployment, datasets will be used in this report.
    8. Prophet Predictions


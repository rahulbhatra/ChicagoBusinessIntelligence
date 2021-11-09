1. Install go lang inside the system.
2. Do pwd ChicagoBusinessIntelligence/chicago_business_intelligence_backend folder and copy that.
3. Now setup go lang environment variables into the system.
    copy paste the following:-
        export GOPATH=pwd
        export PATH=$PATH:$GOPATH/bin

4. Create folder under src and then create service
5. Use go install src/<servicename>/<filename>
6. It will come under the bin folder if successfully compiled.
7. After successful compilation run using bin/<filename>
8. Now our microservice is running.
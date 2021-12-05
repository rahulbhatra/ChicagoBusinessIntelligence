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


Docker & Kubernetes Setup
Go to gitlab.com/ping-service

1. Install Docker
2. Install Minikube which is required for running kubernets on local env link https://minikube.sigs.k8s.io/docs/start/
    a. run minikube start
    b. run minikube dashboard
3. Install Kubernets link link https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/
4. run docker build -t <docker-image-name> .
    example run docker build -t microservices .
5. docker image ls command to see newly created docker image on your local machine
6. docker login (look on internet for more details requied to push image on docker hub)
7. docker tag <docker-image-name> <docker-hub-id>/<docker-image-name>:latest
eg: docker tag microservices rahulbhatra/microservices:latest
8. Now push the image on the docker hub.
    docker push <docker-hub-id>/<docker-image-name>:latest
    docker push rahulbhatra/microservices:latest
9. Now run command kubectl create -f ./ping-service.yaml
10. kubectl get pods (to see local pods running).
11. kubectl logs -f <pod-name>
FROM golang:latest

# RUN mkdir/build
WORKDIR /app
COPY . .

RUN export GO
RUN cd /app/gitlab.com/ping-service && go mod download && go run main.go


EXPOSE 9090
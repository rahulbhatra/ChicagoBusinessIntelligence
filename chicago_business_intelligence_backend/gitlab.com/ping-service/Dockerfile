FROM golang:alpine


WORKDIR /app

COPY . /app
RUN go get github.com/codingsince1985/geo-golang/google
RUN go get github.com/kelvins/geocoder
RUN go get github.com/lib/pq
RUN go install

CMD ["/go/bin/ping-service"]
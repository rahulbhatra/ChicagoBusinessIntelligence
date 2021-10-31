package main

import (
	"log"
	"net/http"
)

func main() {

	http.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) {
		log.Println("Hello world")
	})

	http.ListenAndServe(":9090", nil)
}

package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"
)

func main() {
	urls := strings.Split(os.Getenv("PING_URLS"), ",")

	for _, url := range urls {
		// This is a go routine so it work background
		go pingURL(url)
	}

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
	<-stop

	log.Println("Shutting Down")
}

func pingURL(url string) {
	url = strings.TrimSpace(url)
	for {
		_, err := http.Get(url)
		if err != nil {
			log.Println("There was an erro")
		} else {
			log.Println(url)
		}

		time.Sleep(5 * time.Second)
	}
}

all : checks test

checks:
	go build all
	golangci-lint run

test: checks
	go test -run "TestAzure" ./tests/acceptance/azure/ -v                                                                                                                                                                                                    ─╯

fmt:
	find . -name '*.go' | grep -v vendor | xargs gofmt -s -w

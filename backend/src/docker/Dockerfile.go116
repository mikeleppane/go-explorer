FROM golang:1.16

WORKDIR /go/src/app

RUN groupadd -r appuser && useradd -m -r -g appuser appuser
RUN chown -R appuser:appuser /go/src/app
RUN go install golang.org/x/tools/cmd/goimports@latest

USER appuser

CMD ["go", "version"]
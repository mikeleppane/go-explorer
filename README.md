![ci](https://github.com/mikeleppane/go-explorer/actions/workflows/ci.yml/badge.svg)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

# Go Explorer

This is the home of the [Go Explorer][website].

[website]: https://golangexplorer.org/

<div align="center"><i>New, intuitive, and fun online environment for learning, exploring, and experimenting with the 
Go programming language.</i></div>

## What is Go Explorer?

Go Explorer allows you to learn, explore and experiment with the Go Programming language without no setups and needing
to install the actual compiler.

![image](https://drive.google.com/uc?export=view&id=1DgrftRIvyZILpNQ6T_Z39BTX0I_z0mVS)

## Features

Below is listed all the currently available features:

1. A clear and user-friendly UI with [VS Code] like experience including a syntax highlighting.
2. You can run, build or test your code with a chosen flags including a few environment variables.
3. You can be format [goimports] and statically analyze [go vet] your code.
4. Error highlighting is supported directly in the code in case your code fails to build or the static analyzer founds
   some error.
5. You can share your code with your friends by a link.
6. Tabs are available if you like to experiment different codes at the same time.
7. Basic statistics are provided after an execution: build time, binary size and execution time.
8. You can import your own code from your local computer.
9. Several code templates are available to you if you need something to start with, including:
   basic, testing, benchmarking, concurrency and generics.
10. The most recently edited code is always kept in the local store if in case you accidentally close your session or a
    browser crashes.
11. Currently available versions are: 1.16, 1.17 and 1.18-rc (generics!)

[VS Code]: https://github.com/microsoft/vscode

[goimports]: https://pkg.go.dev/golang.org/x/tools/cmd/goimports

[go vet]: https://pkg.go.dev/cmd/vet

## Architecture

![go-explorer-arch](https://drive.google.com/uc?export=view&id=1ZFnlYImwjnn4zXk0xW8KfEQkwDyeDWKN)

Language: [Typescript][typescript]

The frontend is build using [React][react] and the backend server is build using [NodeJS][nodejs] and [Express][express]
.(perhaps in the future backend will be migrated to Go??)

[Go][go] source code is executed inside a [Docker][docker] container to properly isolate the execution.
[Nginx][nginx] is used as a load balancer and a reverse proxy for the application.

[typescript]: https://www.typescriptlang.org/

[react]: https://reactjs.org/

[nodejs]: https://nodejs.org/en/

[express]: https://expressjs.com/

[go]: https://go.dev/

[docker]: https://www.docker.com/

[nginx]: https://www.nginx.com/

## Resource Limits

### Network

No network connection is completely disabled on a container. Therefore, access to the outside world is blocked.

### CPU

The available CPU resources a container can use is limited.

### Execution Time

The total compilation and execution time is limited by the container.

## Development

### Installing

```
cd go-explorer/frontend && npm install
cd go-explorer/backend && npm install
```

### How to build the UI

```
cd go-explorer/frontend
npm run start:dev
```

This will start a development server allowing a hot reload.

### Build and run the backend

```
cd go-explorer/backend
npm run start:dev
```

### Build or download the containers

```
git pull golang:1.1(6/7/8-rc)
```

### Configure environment variables

You can configure environment variables placing the .env file to the root of go-explorer/frontend and
go-explorer/backend folders.

#### Backend

| ENV     | NEEDED |  DEFAULT  | REMARK                                         |
|---------|:------:|:---------:|:-----------------------------------------------|
| GOLANG_VERSIONS |   NO   | 1.17 | semicolon separated list of available versions |
| PORT    |   NO   |   5000    |                                                |

#### Frontend

| ENV             | NEEDED |          DEFAULT          | REMARK                                         |
|-----------------|:------:|:-------------------------:|:-----------------------------------------------|
| GOLANG_VERSIONS |   NO   |           1.17            | semicolon separated list of available versions |
| PORT            |   NO   |           3000            |                                                |
| API_BASE_URL    |   NO   | http://localhost:5000/api |                                                |
| BASE_URL        |   NO   |   http://localhost:3000   |                                                |

### Testing

Run backend tests:

```
npm run test
```

Run frontend e2e tests:

```
npm run test:e2e
```

## Deployment

* [Digital Ocean (Ubuntu)](https://www.digitalocean.com/products/droplets/)

## Community

* Please share your ideas if the application is missing some feature or there's some issue.
* Suggestions are also welcome if out environment is lacking some Go package.

:pray:

## User Guide

[Guide](https://golangexplorer.org/help)

## Browser Support

The application should work on a relatively modern browser. It has been tested with Firefox (95), Chrome (96), and
Edge (96).

## License

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

[MIT](./LICENSE.md)

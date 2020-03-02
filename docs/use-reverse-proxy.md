# Use Reverse Proxy


## Environmental parameters

- REACT_BUNDLE_PATH=/ap-main/static
> this is build bundle path, and ${assets.client.js} path
- ROUTE_PREFIX_PATH=/ap-main
> this is website url root
- STATIC_PREFIX_URL=/ap-main/static
> your frontend asset path
- UPLOAD_PREFIX_URL=/ap-main/upload
> your backend upload path (`option`, you can provide the full URL from the backend API)


## Nginx Config

`{project_root}/test/reverse-proxy/default.conf`

location /ap-main {
     proxy_pass http://localhost:3000;
}

#### Quick Start

Terminal 1 run source service
```zsh
$ docker-compose up --build
```

Terminal.2 run reverse proxy service
```zsh
$ docker-compose -f ./test/reverse-proxy/docker-compose.yml up
```

🚀 open browser example in http://localhost:3002/ap-main


#### if you run docker have error, please you clean docker data

```
$ docker rm $(docker ps -a -f status=exited -f status=created -q)
$ docker rmi $(docker images -a -q)
```

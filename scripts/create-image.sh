#!/usr/bin/env bash
docker rm -f trails-api
docker image prune
docker volume prune
docker build -t trails-api .

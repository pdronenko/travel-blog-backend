#!/usr/bin/env bash
docker rm -f travel_blog_api
docker image prune
docker volume prune
docker build -t travel_blog_api .
sudo docker-compose -f ./docker-compose.yml up --force-recreate -d

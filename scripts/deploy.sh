#!/usr/bin/env bash
sh /home/ubuntu/create-image.sh
docker-compose -f /home/ubuntu/docker-compose.yml up --force-recreate

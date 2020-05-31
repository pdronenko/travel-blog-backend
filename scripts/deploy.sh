#!/usr/bin/env bash
sh ./scripts/create-image.sh
docker-compose -f ./docker-compose.yml up --force-recreate

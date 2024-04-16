#!/bin/sh
ip=`docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' diplomarbeit_db`

echo "DB_IP=$ip" >> web/api/.env

echo $ip
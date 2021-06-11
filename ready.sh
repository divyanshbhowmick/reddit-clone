#!/bin/sh
echo "*************🚀STARTING🚀****************"

echo "1. Postgres Server"

/bin/sh -ec pg_ctl -D "C:\Users\divyansh.bhowmick\AppData\Roaming\pgsql\mydb" start
postgres_pid = $!
if [ $? -eq 0 ]; then
   echo Postgres server started🌌
else
   echo Failed to start👿
fi

echo "2. Redis Server"
/bin/sh -ec C:/Users/divyansh.bhowmick/Documents/Softwares/Redis-x64-3.2.100/redis-server
redis_pid = $!
if [ $? -eq 0 ]; then
   echo Redis server started🍪
else
   echo Failed to start👿
fi

echo "2. Backend Server"
cd ./server
yarn start
backend_pid = $!

function cleanup(){
   echo "*************** Cleanup🧹 ***********"
   echo "1. Stopping Postgres Server"
   pg_ctl -D "C:\Users\divyansh.bhowmick\AppData\Roaming\pgsql\mydb" stop
   echo "1. Stopping Redis Server"
   rm -rf C:/Users/divyansh.bhowmick/Documents/Softwares/Redis-x64-3.2.100/dump.rdb
}


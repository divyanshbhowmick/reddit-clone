start cmd /k pg_ctl -D "C:\Users\divyansh.bhowmick\AppData\Roaming\pgsql\mydb" start
start cmd /k C:/Users/divyansh.bhowmick/Documents/Softwares/Redis-x64-3.2.100/redis-server
cd server
@REM start cmd /k yarn watch
@REM start cmd /K yarn dev
start cmd /K yarn start
cd ..
cd web
start cmd /k yarn dev
@echo off
echo Stopping all BookMyShow Microservices...

for %%P in (8080 8082 8083 8084 8085 8086 8096 8097) do (
    for /f "tokens=5" %%a in ('netstat -aon ^| findstr :%%P') do (
        echo Killing process %%a on port %%P...
        taskkill /F /PID %%a 2>nul
    )
)

echo All services stopped.

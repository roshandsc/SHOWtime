@echo off
echo ==========================================
echo  Starting BookMyShow Microservices Suite  
echo ==========================================

echo Building all modules...
call mvn clean package -DskipTests

if %ERRORLEVEL% NEQ 0 (
    echo Build failed. Exiting.
    exit /b %ERRORLEVEL%
)

echo Starting microservices...
start "User Service" /D user-service mvn spring-boot:run
timeout /t 3
start "Movie Service" /D movie-service mvn spring-boot:run
timeout /t 3
start "Screen Service" /D screen-service mvn spring-boot:run
timeout /t 3
start "Show Service" /D show-service mvn spring-boot:run
timeout /t 3
start "Seat Service" /D seat-service mvn spring-boot:run
timeout /t 3
start "Booking Service" /D booking-service mvn spring-boot:run
timeout /t 3
start "Payment Service" /D payment-service mvn spring-boot:run
timeout /t 3
start "API Gateway" /D api-gateway mvn spring-boot:run

echo All services launched!
echo API Gateway running on http://localhost:8080

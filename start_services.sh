#!/bin/sh

echo "=========================================="
echo " Starting ShowTime Backend Microservices  "
echo "=========================================="

export PORT=${PORT:-8080}

# Launch internal microservices in background
java -jar /app/user-service.jar &
java -jar /app/movie-service.jar &
java -jar /app/screen-service.jar &
java -jar /app/show-service.jar &
java -jar /app/seat-service.jar &
java -jar /app/booking-service.jar &
java -jar /app/payment-service.jar &

# Wait 5 seconds for internal microservices to initialize
sleep 5

# Launch API Gateway in foreground on public port (8080 or PORT)
echo "Starting API Gateway on port $PORT..."
exec java -Dserver.port=$PORT -jar /app/api-gateway.jar

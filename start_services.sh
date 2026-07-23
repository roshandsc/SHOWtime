#!/bin/sh

echo "=========================================="
echo " Starting ShowTime Backend Microservices  "
echo "=========================================="

export PORT=${PORT:-8080}

JVM_OPTS="-Xms20m -Xmx40m -XX:+UseSerialGC -XX:+TieredCompilation -XX:TieredStopAtLevel=1"

# 1. Launch API Gateway FIRST so Render port scanner detects open port immediately!
echo "Starting API Gateway on 0.0.0.0:$PORT..."
java -Xms32m -Xmx80m -XX:+UseSerialGC -Dserver.address=0.0.0.0 -Dserver.port=$PORT -jar /app/api-gateway.jar &

# 2. Launch background microservices
java $JVM_OPTS -jar /app/user-service.jar &
java $JVM_OPTS -jar /app/movie-service.jar &
java $JVM_OPTS -jar /app/screen-service.jar &
java $JVM_OPTS -jar /app/show-service.jar &
java $JVM_OPTS -jar /app/seat-service.jar &
java $JVM_OPTS -jar /app/booking-service.jar &
java $JVM_OPTS -jar /app/payment-service.jar &

# Keep container alive and stream logs
exec wait

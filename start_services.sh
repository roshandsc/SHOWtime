#!/bin/sh

echo "=========================================="
echo " Starting ShowTime Backend Microservices  "
echo "=========================================="

export PORT=${PORT:-8080}

JVM_OPTS="-Xms20m -Xmx40m -XX:+UseSerialGC -XX:+TieredCompilation -XX:TieredStopAtLevel=1"

# 1. Launch internal microservices in background
echo "Starting internal microservices..."
java $JVM_OPTS -jar /app/user-service.jar &
java $JVM_OPTS -jar /app/movie-service.jar &
java $JVM_OPTS -jar /app/screen-service.jar &
java $JVM_OPTS -jar /app/show-service.jar &
java $JVM_OPTS -jar /app/seat-service.jar &
java $JVM_OPTS -jar /app/booking-service.jar &
java $JVM_OPTS -jar /app/payment-service.jar &

# 2. Launch API Gateway in FOREGROUND on public port (0.0.0.0:PORT)
echo "Starting API Gateway on 0.0.0.0:$PORT..."
exec java -Xms32m -Xmx80m -XX:+UseSerialGC -Dserver.address=0.0.0.0 -Dserver.port=$PORT -jar /app/api-gateway.jar

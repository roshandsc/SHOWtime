#!/bin/sh

echo "=========================================="
echo " Starting ShowTime Backend Microservices  "
echo "=========================================="

export PORT=${PORT:-8080}

JVM_OPTS="-Xms16m -Xmx36m -XX:+UseSerialGC -XX:+TieredCompilation -XX:TieredStopAtLevel=1"

# 1. Launch API Gateway FIRST so Render port scanner detects open port immediately!
echo "Starting API Gateway on 0.0.0.0:$PORT..."
java -Xms32m -Xmx64m -XX:+UseSerialGC -XX:+TieredCompilation -XX:TieredStopAtLevel=1 -Dserver.address=0.0.0.0 -Dserver.port=$PORT -jar /app/api-gateway.jar &
GATEWAY_PID=$!

# Wait 3 seconds for API Gateway Netty server to open port $PORT
sleep 3

# 2. Launch background microservices staggered with 1 sec delay to prevent CPU spike
echo "Launching microservices suite..."
java $JVM_OPTS -jar /app/user-service.jar &
sleep 1
java $JVM_OPTS -jar /app/movie-service.jar &
sleep 1
java $JVM_OPTS -jar /app/screen-service.jar &
sleep 1
java $JVM_OPTS -jar /app/show-service.jar &
sleep 1
java $JVM_OPTS -jar /app/seat-service.jar &
sleep 1
java $JVM_OPTS -jar /app/booking-service.jar &
sleep 1
java $JVM_OPTS -jar /app/payment-service.jar &

# Keep shell active waiting on API Gateway PID
wait $GATEWAY_PID

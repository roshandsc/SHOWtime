#!/bin/sh

echo "=========================================="
echo " Starting ShowTime Backend Microservices  "
echo "=========================================="

export PORT=${PORT:-8080}

# Low-memory JVM options tailored for Render 512MB RAM free container
JVM_OPTS="-Xms24m -Xmx48m -XX:+UseSerialGC -XX:+TieredCompilation -XX:TieredStopAtLevel=1"

# Launch internal microservices in background
java $JVM_OPTS -jar /app/user-service.jar &
java $JVM_OPTS -jar /app/movie-service.jar &
java $JVM_OPTS -jar /app/screen-service.jar &
java $JVM_OPTS -jar /app/show-service.jar &
java $JVM_OPTS -jar /app/seat-service.jar &
java $JVM_OPTS -jar /app/booking-service.jar &
java $JVM_OPTS -jar /app/payment-service.jar &

# Wait 4 seconds for internal microservices to initialize
sleep 4

# Launch API Gateway on public port (8080 or PORT)
echo "Starting API Gateway on port $PORT..."
exec java -Xms32m -Xmx80m -XX:+UseSerialGC -Dserver.port=$PORT -jar /app/api-gateway.jar

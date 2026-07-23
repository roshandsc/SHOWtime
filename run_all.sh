#!/usr/bin/env bash

echo "=========================================="
echo " Starting BookMyShow Microservices Suite  "
echo "=========================================="

SERVICES=("user-service" "movie-service" "screen-service" "show-service" "seat-service" "booking-service" "payment-service" "api-gateway")

echo "Building all modules..."
mvn clean package -DskipTests

if [ $? -ne 0 ]; then
    echo "Build failed. Exiting."
    exit 1
fi

echo "Starting microservices..."
for service in "${SERVICES[@]}"; do
    echo "Starting $service..."
    (cd "$service" && mvn spring-boot:run > "../$service.log" 2>&1) &
    sleep 3
done

echo "All services launched! Log files created in project root."
echo "API Gateway running on http://localhost:8080"

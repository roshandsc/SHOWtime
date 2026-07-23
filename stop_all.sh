#!/usr/bin/env bash

echo "Stopping all BookMyShow Microservices..."

PORTS=(8080 8082 8083 8084 8085 8086 8096 8097)

for port in "${PORTS[@]}"; do
    pid=$(lsof -t -i:$port)
    if [ -n "$pid" ]; then
        echo "Killing process on port $port (PID $pid)..."
        kill -9 $pid 2>/dev/null
    fi
done

echo "All services stopped."

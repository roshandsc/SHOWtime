#!/bin/sh

echo "=========================================="
echo " Starting ShowTime Backend Service        "
echo "=========================================="

export PORT=${PORT:-8080}

# Launch single unified JVM process loading server-config explicitly to avoid classpath collisions
exec java -Xms64m -Xmx192m -XX:+UseSerialGC -Dspring.config.name=server-config -Dserver.address=0.0.0.0 -Dserver.port=$PORT -jar /app/server.jar

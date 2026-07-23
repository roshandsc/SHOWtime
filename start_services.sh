#!/bin/sh

echo "=========================================="
echo " Starting ShowTime Backend Service        "
echo "=========================================="

export PORT=${PORT:-8080}

# Launch single unified JVM process tailored for Render 512MB RAM free tier
exec java -Xms64m -Xmx192m -XX:+UseSerialGC -Dserver.address=0.0.0.0 -Dserver.port=$PORT -jar /app/server.jar

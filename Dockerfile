# ── STAGE 1: Build Java Modules with Maven ───────────────────────
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /build

COPY pom.xml .
COPY api-gateway/pom.xml api-gateway/
COPY user-service/pom.xml user-service/
COPY movie-service/pom.xml movie-service/
COPY screen-service/pom.xml screen-service/
COPY show-service/pom.xml show-service/
COPY seat-service/pom.xml seat-service/
COPY booking-service/pom.xml booking-service/
COPY payment-service/pom.xml payment-service/

COPY api-gateway/src api-gateway/src
COPY user-service/src user-service/src
COPY movie-service/src movie-service/src
COPY screen-service/src screen-service/src
COPY show-service/src show-service/src
COPY seat-service/src seat-service/src
COPY booking-service/src booking-service/src
COPY payment-service/src payment-service/src

RUN mvn clean package -DskipTests

# ── STAGE 2: Lightweight Runtime Image ──────────────────────────
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy built JAR files from builder
COPY --from=builder /build/api-gateway/target/*.jar /app/api-gateway.jar
COPY --from=builder /build/user-service/target/*.jar /app/user-service.jar
COPY --from=builder /build/movie-service/target/*.jar /app/movie-service.jar
COPY --from=builder /build/screen-service/target/*.jar /app/screen-service.jar
COPY --from=builder /build/show-service/target/*.jar /app/show-service.jar
COPY --from=builder /build/seat-service/target/*.jar /app/seat-service.jar
COPY --from=builder /build/booking-service/target/*.jar /app/booking-service.jar
COPY --from=builder /build/payment-service/target/*.jar /app/payment-service.jar

# Copy entrypoint script
COPY start_services.sh /app/start_services.sh
RUN chmod +x /app/start_services.sh

EXPOSE 8080

ENTRYPOINT ["/app/start_services.sh"]

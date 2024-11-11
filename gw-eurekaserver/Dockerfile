FROM amazoncorretto:21-alpine-jdk
WORKDIR /app
COPY target/gw-eureka-0.0.1-SNAPSHOT.jar /app/gw-eureka-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "gw-eureka-0.0.1-SNAPSHOT.jar"]


EXPOSE 8761

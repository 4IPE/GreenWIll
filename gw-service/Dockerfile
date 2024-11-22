FROM amazoncorretto:21-alpine-jdk
VOLUME /tmp
COPY target/gw-service-0.0.1-SNAPSHOT.jar gw-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "gw-service-0.0.1-SNAPSHOT.jar"]
EXPOSE 9090
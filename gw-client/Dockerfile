FROM amazoncorretto:21-alpine-jdk
VOLUME /tmp
COPY target/gw-client-0.0.1-SNAPSHOT.jar gw-client-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "gw-client-0.0.1-SNAPSHOT.jar"]

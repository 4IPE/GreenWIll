FROM amazoncorretto:21-alpine-jdk
VOLUME /tmp
COPY target/gw-kafka-0.0.1-SNAPSHOT.jar gw-kafka-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "gw-kafka-0.0.1-SNAPSHOT.jar"]

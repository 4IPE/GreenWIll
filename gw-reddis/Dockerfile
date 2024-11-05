FROM amazoncorretto:21-alpine-jdk
VOLUME /tmp
COPY target/gw-reddis-0.0.1-SNAPSHOT.jar gw-reddis-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "gw-reddis-0.0.1-SNAPSHOT.jar"]

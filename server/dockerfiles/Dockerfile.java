FROM openjdk:latest
WORKDIR /app
COPY . .
CMD [ "java", "-version" ]
FROM gcc:latest
WORKDIR /app
COPY . .
RUN apt-get update && apt-get install -y cmake
CMD [ "g++", "--version", "&&", "gcc", "--version" ]

FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli@13
RUN npm install
COPY . .
VOLUME ["/app"]
CMD ["ng", "serve"]

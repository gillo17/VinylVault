FROM node:20-alpine

WORKDIR /app

# Install Expo CLI
RUN npm install -g expo

# Copy package files
COPY package*.json ./

RUN npm install

# Copy project
COPY . .

EXPOSE 19000 19001 19002

CMD ["npx", "expo", "start"]
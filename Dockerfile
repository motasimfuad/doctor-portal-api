FROM node:19
WORKDIR /index
COPY package.json ./
RUN npm start
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

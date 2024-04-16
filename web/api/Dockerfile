FROM node:21

COPY tsconfig.json .
COPY package.json .
COPY ./src/ src/
RUN mkdir app
COPY ../app/ app/
RUN npm install
EXPOSE 3001
CMD ["npm", "run", "start"]

FROM node:21

RUN mkdir api
RUN mkdir app
RUN mkdir api/src
COPY ./api/tsconfig.json ./api
COPY ./api/package.json ./api
COPY ./api/src/ api/src/
COPY ./app/ app/
WORKDIR ./api
RUN npm install
EXPOSE 3001

CMD ["npm", "run", "start"]

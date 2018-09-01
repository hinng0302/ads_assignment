FROM node:8.11.2-alpine
RUN npm i -g @adonisjs/cli
RUN apk update && apk add vim git make gcc g++ python linux-headers paxctl gnupg bash
ENV HOST=0.0.0.0
ENV PORT=80
ENV NODE_ENV=development
ENV APP_KEY=XJihMpc0gdCj23BGzIqKMRzKASMD1vcA
ENV APP_URL=http://${HOST}:${PORT}
ENV CACHE_VIEWS=false
ENV DB_CONNECTION=mongodb
ENV DB_HOST=40.74.84.116
ENV DB_PORT=27017
ENV DB_USER=mongoadmin
ENV DB_PASSWORD=secret
ENV DB_DATABASE=admin
ENV SESSION_DRIVER=cookie
ENV HASH_DRIVER=bcrypt
ENV DEFAULT_DOMAIN=http://40.74.84.116
WORKDIR /home/node/app
RUN cd /home/node/app && pwd
RUN git clone https://github.com/hinng0302/ads_assignment.git
WORKDIR /home/node/app/ads_assignment
RUN npm install
EXPOSE 80
CMD ["adonis", "serve", "--dev"]

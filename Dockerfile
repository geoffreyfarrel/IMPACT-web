FROM node:20

LABEL maintainer="geoffrey" version="0" description="impact-webpage"

WORKDIR /impact-webpage

ADD . /impact-webpage

RUN npm install

EXPOSE 5010

CMD ["node", "app.js"]
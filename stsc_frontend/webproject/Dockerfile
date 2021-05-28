FROM nginx

MAINTAINER Output <hardingcheng@163.com>

RUN rm /etc/nginx/conf.d/default.conf

ADD default.conf /etc/nginx/conf.d/

COPY dist/  /usr/share/nginx/html/

RUN echo 'build img ok!' #输出完成

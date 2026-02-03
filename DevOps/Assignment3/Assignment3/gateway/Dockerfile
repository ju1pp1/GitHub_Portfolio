FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/nginx.conf
# which upstream (v1 or v2) is currently active:
COPY active_upstream.conf /etc/nginx/conf.d/active_upstream.conf
# basic auth file (precreated by you below)
COPY auth/.htpasswd /etc/nginx/.htpasswd
# self-signed or Let’s Encrypt live certs (mount in compose if you get LE) 
COPY certs/ /etc/nginx/certs/
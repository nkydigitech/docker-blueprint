# Build stage - no build needed, pure static
FROM nginx:1.25-alpine AS prod

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Custom nginx config for SPA + caching
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static site
COPY . /usr/share/nginx/html

# Security headers & gzip already in nginx.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1
CMD ["nginx","-g","daemon off;"]

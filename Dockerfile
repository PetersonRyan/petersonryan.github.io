FROM nginx

# Run on port 8080
EXPOSE 8080

# Remove original configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/

# Copy all content to default nginx serving folder
COPY ./ /usr/share/nginx/html/

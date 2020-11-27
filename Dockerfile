FROM nginx

# Run on port 8080
EXPOSE 8080

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy all content to default nginx serving folder
COPY ./ /usr/share/nginx/html/

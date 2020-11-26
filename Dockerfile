FROM nginx

# Run on port 8080
EXPOSE 8080

# Copy all content to default nginx serving folder
COPY ./ /usr/share/nginx/html/

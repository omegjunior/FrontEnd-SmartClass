# Utilisation de l'image Nginx officielle en tant que base
FROM nginx:alpine

# Copier le contenu du répertoire "frontend" de votre système local dans le répertoire "/usr/share/nginx/html" du conteneur
COPY ./smartclass /usr/share/nginx/html

# Copier le certificat SSL et la clé privée dans le conteneur
COPY ./certificate.crt /etc/nginx/certificate.crt
COPY ./ca_bundle.crt /etc/nginx/ca_bundle.crt
COPY ./private.key /etc/nginx/private.key

# Supprimer le fichier de configuration par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copier le fichier de configuration personnalisé de Nginx
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf

# Exposer le port 443 pour que les requêtes HTTPS puissent accéder au contenu du conteneur
EXPOSE 443

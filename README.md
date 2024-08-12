# Jobboard

C'est un projet de type jobboard. 
En tant qu'utilisateur, on peut consulter des offres d'emploi dans divers secteurs et y postuler. On a également accès aux informations des entreprises qui ont publié ces offres. 
Pour les entreprises, il est possible de publier des annonces pour recruter des employés qualifiés et fiables.

## Technologies utilisées 

**Frontend:** 
- React
- Tailwindcss

**Backend:**
- Node
- Express
- SQL
- MySQL

  ## Installation

  Afin de lancer le projet sur votre machine vous devez vous assurez d'avoir node installer et mysql puis suivez les étapes suivantes :
  1. clonnez le projet : `git clone git@github.com:Naimoudine/job-app.git`
  2. Accédez au répertoire du projet : `cd justChat`
  3. Installez les dépendances du projet : `npm install`
  4. Installez les dépendances du Client : `cd client npm install`
  5. Installez les dépendances du Serveur : `cd server npm install`
  6. Configurer le .env : créer un fichier ".env" à la racine du dossier "client" et insérer dedans :
  <br>
     
  | clé | valeur |
  | ------------- | ------------- |
  | VITE_API_URL  | http://localhost:3310/api/ |

   6. Configurer le .env : créer un fichier ".env" à la racine du dossier "server" et insérer dedans :
  <br>
     
  | clé | valeur |
  | ------------- | ------------- |
  | NODE_ENV  | development |
  | APP_PORT | exemple: 3310 |
  | APP_SECRET | exemple: secret |
  | HOST_URL | http://localhost:3310/ |
  | DB_PORT | 3306 |
  | DB_HOST | localhost |
  | DB_USER | mysql user |
  | DB_PASSWORD | mysql password |
  | DB_NAME| mysql database name|
  | CLIENT_URL| http://localhost:5173|

  7. Lancer le projet : `cd .. npm run dev`
 





  

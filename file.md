## angular cli commands

ng g m pages/users --routing=true

ng g c pages/users --inlineStyle=true -m=pages/users --skipTests=true

ng g c shared/components/top-bar -m=shared/components --inlineStyle=true --skipTests=true
ng g c shared/components/side-bar -m=shared/components --inlineStyle=true --skipTests=true

ng g c shared/components/top-bar -m=shared/components --inlineStyle=true --skipSelector=true --skipTests=true\n


## dev env

### Frontend angular v9

Root folder has angular project structure.
Inside root folder is 'server' folder with API

### Backend (API) nodejs v10

'server' folder has nodejs project with express.
with server/docker-compose.yml run api with web compiled on server/public

    `docker-compose up`

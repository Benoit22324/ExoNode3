## Initialisation
Pour initialiser le projet en local, veuillez installer pnpm avec :
```
npm install -g pnpm
```
Puis ensuite, suivez ces étapes :
1. Cloner le repo
```
git clone https://github.com/Benoit22324/ExoNode3.git
```
2. Installer les dépendances
```
pnpm install
```
3. Lancer en local
```
pnpm dev
```
PS: Vous ne verrez pas le lien vers le front mais il faut aller sur
http://localhost:5173

## Initialisation de la bdd
Il faut avoir initialiser le projet avant de continuer.

1. Aller dans le bon fichier
```
cd packages/server
```
2. Créer les fichiers à migrer
```
pnpm generate
```
3. Migrer vers la bdd
```
pnpm migrate
```
4. (optionel) Visualisation alternative de la bdd
```
pnpm studio
```
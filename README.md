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
PS: Si vous ne voyez pas le lien vers la preview du front, vous avez le lien ici :
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
4. Ajouter les données par défaut
```
pnpm default
```
5. (optionel) Visualisation alternative de la bdd
```
pnpm studio
```
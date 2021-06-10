# Gilbert Form: web-component for Gilbert Wordpress Plugin

Composant web basé sur Vue 3 et Tailwindcss.
Une fois buildé, déplacer le dossier "dist" dans WordPress, précisemment dans le fichier du plugin.

## Build command
```
yarn build --target wc --name gilbert-plugin 'src/App.vue'
```

## Lancer en local
```
yarn install && yarn dev
```

### Vue.config.js

La destination du build "dist" est dans ce dossier. Mais si vous avez une instance WordPress locale, veuillez changer la destination.

Par exemple:
```
module.exports = {
  outputDir: '../../../../../../Applications/MAMP/htdocs/wordpress/wp-content/plugins/gilbert-plugin/dist',
}
```

## Google Analytics
```
'send', 'event', `Question ${this.currentStep}`
```